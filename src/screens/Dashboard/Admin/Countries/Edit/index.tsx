import {
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardForm,
  DashboardFormThumbnailImage,
  DashboardFormSubmitButton,
  DashboardButton,
  DashboardSection,
  DashboardSectionTitle,
  DashboardSectionHeader,
} from "@components/Layout/Dashboard";
import { NextPage } from "next";
import ROUTES from "@constants/routes";
import DashboardProvider from "@components/Dashboard/Provider";
import { useForm } from "@hooks/useForm";
import { useMutation } from "@apollo/react-hooks";
import {
  DELETE_COUNTRY,
  GET_COUNTRY_BY_SLUG,
  UPDATE_COUNTRY,
  UPDATE_COUNTRY_SERVICES,
} from "src/queries/countries";
import Button from "@components/Layout/Button";
import { City, Country, CountryService } from "@typeDefs/destinations";
import router from "next/router";
import { getStandaloneApolloClient } from "@services/apollo/client";
import styled from "styled-components";
import { GET_CITIES_WITH_COUNTRY_ID } from "@queries/cities";
import { DashboardPage } from "@typeDefs/auth";
import { GET_COUNTRYVARIABLE_SERVICES } from "@queries/services";
import React from "react";
import { Service } from "@typeDefs/services";
import DashboardI18nField from "@components/Dashboard/I18n/Field";
import Icon from "@components/Layout/Icon";

interface Props extends DashboardPage {
  data: {
    getCountryBySlug: Country;
    getCitiesWithCountryId: City[];
    getCountryVariableServices: Service[];
  };
}

const DestinationEdit: NextPage<Props> = ({
  currentUser,
  data: {
    getCountryBySlug: country,
    getCitiesWithCountryId: cities,
    getCountryVariableServices: services,
  },
}: Props) => {
  const [countryServices, setCountryServices] = React.useState<
    CountryService[]
  >(
    services.map((service: Service) => ({
      serviceId: service.id,
      price:
        country.services_prices.find((s) => s.serviceId == service.id)?.price ||
        service.price,
    }))
  );

  const { values, setValues, onChange, onSubmit } = useForm(
    () => updateCountry(),
    {
      description: {
        en: country.translations.en.description,
        fr: "",
      },
      thumbnailUrl: country.thumbnailUrl,
    }
  );

  const [updateCountry] = useMutation(UPDATE_COUNTRY, {
    variables: { ...values, countryId: country.id },
    update() {
      router.push(ROUTES.DASHBOARD_ADMIN_COUNTRIES);
    },
  });

  const [deleteCountry] = useMutation(DELETE_COUNTRY, {
    variables: {
      countryId: country.id,
    },
    update() {
      router.push(ROUTES.DASHBOARD_ADMIN_COUNTRIES);
    },
  });

  const {
    onChange: onChangeCountryServices,
    onSubmit: onSubmitCountryServices,
  } = useForm(() => updateCountryService(), countryServices);

  const handleI18nChange = React.useCallback(
    (value: { [key: string]: string }) => {
      setValues((prev: any) => ({ ...prev, description: value }));
    },
    [setValues]
  );
  console.log(values);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const value = e.target.value;
      const name = e.target.name;

      setCountryServices(
        countryServices.map((service: CountryService) => {
          if (service.serviceId === parseInt(name)) {
            service.price = parseInt(value);
          }

          return service;
        })
      );

      onChangeCountryServices(e);
    },
    [onChangeCountryServices, countryServices]
  );

  const [updateCountryService] = useMutation(UPDATE_COUNTRY_SERVICES, {
    variables: {
      countryId: country.id,
      services: countryServices.filter(
        (service: CountryService) => service.price > 0
      ),
    },
  });

  return (
    <DashboardProvider
      title={`Destinations > ${country.name}`}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              deleteCountry();
            }}
            red
            prefix={<Icon name={"delete-bin"} fill />}
          >
            Delete
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_ADMIN_COUNTRIES);
            }}
            mode={"darker"}
            prefix={<Icon name={"arrow-drop-left"} />}
          >
            Back
          </DashboardButton>
        </>
      }
    >
      {country ? (
        <>
          <FormSection>
            <DashboardSectionHeader>
              <DashboardSectionTitle>
                {"Modifier les informations"}
              </DashboardSectionTitle>
              <DashboardFormSubmitButton
                onClick={onSubmit}
                prefix={<Icon name={"save"} fill />}
              >
                Enregistrer les modifications
              </DashboardFormSubmitButton>
            </DashboardSectionHeader>
            <Row>
              <Col>
                <DashboardFieldGroup>
                  <DescriptionLabel htmlFor="description">
                    Description
                  </DescriptionLabel>
                  <DashboardFieldContainer>
                    <DashboardI18nField
                      onChange={handleI18nChange}
                      value={values.description}
                    />
                  </DashboardFieldContainer>
                </DashboardFieldGroup>
                <DashboardFieldGroup>
                  <ThumbnailLabel htmlFor="thumbnail">Vignette</ThumbnailLabel>
                  <DashboardFieldContainer>
                    <DashboardField
                      type={"text"}
                      id={"thumbnailUrl"}
                      name={"thumbnailUrl"}
                      placeholder={
                        "https://image-website.com/superbe-image-japon"
                      }
                      onChange={onChange}
                      value={values.thumbnailUrl}
                    />
                  </DashboardFieldContainer>
                </DashboardFieldGroup>
              </Col>
              <Col>
                <ThumbnailImage
                  src={values.thumbnailUrl}
                  alt={"Thumbnail Preview"}
                />
              </Col>
            </Row>
          </FormSection>

          <DashboardSection>
            <DashboardSectionHeader>
              <DashboardSectionTitle>
                {"Liste des villes"}
              </DashboardSectionTitle>
              <DashboardButton
                onClick={() => {
                  router.push(
                    `${ROUTES.DASHBOARD_ADMIN_COUNTRIES}/${country.slug}/add`
                  );
                }}
                prefix={<Icon name={"add"} fill />}
              >
                Ajouter une ville
              </DashboardButton>
            </DashboardSectionHeader>
            <DestinationCityList>
              {cities && cities.length > 0 ? (
                cities.map((city: City, i: number) => (
                  <DestinationCityListCard key={i}>
                    <DestinationCityListCardTitle>
                      {city.name}
                    </DestinationCityListCardTitle>
                    <Button
                      onClick={() => {
                        router.push(
                          `${ROUTES.DASHBOARD_ADMIN_COUNTRIES}/${country.slug}/${city.slug}`
                        );
                      }}
                      mode={"darker"}
                      prefix={<Icon name={"pencil"} fill />}
                    >
                      Modifier
                    </Button>
                  </DestinationCityListCard>
                ))
              ) : (
                <div>{"There are no cities registered."}</div>
              )}
            </DestinationCityList>
          </DashboardSection>

          <FormSection>
            <DashboardSectionHeader>
              <DashboardSectionTitle>
                {"Variation du prix des services"}
              </DashboardSectionTitle>
              <DashboardFormSubmitButton
                onClick={onSubmitCountryServices}
                prefix={<Icon name={"save"} fill />}
              >
                Enregistrer les modifications
              </DashboardFormSubmitButton>
            </DashboardSectionHeader>
            <DestinationServicesList>
              {countryServices && countryServices.length > 0 ? (
                <DashboardForm onSubmit={onSubmit}>
                  {countryServices.map(
                    (service: CountryService, index: number) => (
                      <DashboardFieldGroup key={index}>
                        <ThumbnailLabel htmlFor={index.toString()}>
                          {service.serviceId}
                        </ThumbnailLabel>
                        <DashboardFieldContainer>
                          <DashboardField
                            type={"number"}
                            id={index.toString()}
                            name={service.serviceId.toString()}
                            onChange={handleChange}
                            defaultValue={service.price}
                          />
                          {"€"}
                        </DashboardFieldContainer>
                      </DashboardFieldGroup>
                    )
                  )}
                </DashboardForm>
              ) : (
                <div>{"There are no services registered."}</div>
              )}
            </DestinationServicesList>
          </FormSection>
        </>
      ) : (
        <div>{"This country doesn't exist"}</div>
      )}
    </DashboardProvider>
  );
};

const FormSection = styled(DashboardSection)`
  background-color: ${({ theme }) => theme.colors.layout.darker};
  margin: 30px 15px;
  border-radius: 5px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionLabel = styled(DashboardFieldLabel)`
  margin: 25px 30px 0 0;
`;

const ThumbnailLabel = styled(DashboardFieldLabel)`
  margin-right: 30px;
  margin-left: 25px;
`;

const ThumbnailImage = styled(DashboardFormThumbnailImage)`
  width: 200px;
  height: 200px;
  margin-bottom: 30px;
`;

const DestinationCityList = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const DestinationCityListCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.layout.light};
  border-radius: 10px;
  transition: all 0.2s;
  margin-top: 10px;
  :first-child {
    margin-top: 0;
  }
`;

const DestinationCityListCardTitle = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const DestinationServicesList = styled.div`
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

DestinationEdit.getInitialProps = async ({ query }) => {
  const { countrySlug } = query;
  const { query: apolloQuery } = await getStandaloneApolloClient();
  const { data: country }: { data: { getCountryBySlug: Country } } =
    await apolloQuery({
      query: GET_COUNTRY_BY_SLUG,
      variables: {
        countrySlug,
      },
    });

  const { data: cities }: { data: { getCitiesWithCountryId: City[] } } =
    await apolloQuery({
      query: GET_CITIES_WITH_COUNTRY_ID,
      variables: {
        countryId: country.getCountryBySlug.id,
      },
    });

  const {
    data: services,
  }: { data: { getCountryVariableServices: Service[] } } = await apolloQuery({
    query: GET_COUNTRYVARIABLE_SERVICES,
  });

  return {
    data: { ...country, ...cities, ...services },
  };
};

export default DestinationEdit;
