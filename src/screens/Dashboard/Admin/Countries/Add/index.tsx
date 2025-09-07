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
  DashboardSelect,
} from "@components/Layout/Dashboard";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";
import DashboardProvider from "@components/Dashboard/Provider";
import { useForm } from "@hooks/useForm";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COUNTRY } from "src/queries/countries";
import { ChangeEvent, useCallback } from "react";
import { DashboardPage } from "@typeDefs/auth";
import slugify from "slugify";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { GET_WORLD_COUNTRIES } from "@queries/world-countries";
import { WCountry } from "@typeDefs/world-countries";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import Icon from "@components/Layout/Icon";

type Props = DashboardPage & {
  countries: WCountry[];
};

const DestinationAdd: NextPage<Props> = ({ currentUser, countries }: Props) => {
  const router = useRouter();

  const createCountryCallback = async () => {
    createCountry();
  };

  const { values, onChange, onSubmit } = useForm(createCountryCallback, {
    name: "",
    slug: "",
    iso2: "",
    iso3: "",
    currency: "",
    long: "",
    lat: "",
    region: "",
    services: [],
    description: "",
    thumbnailUrl: "https://picsum.photos/1920/1080",
  });

  const onCountrySelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const country = countries.find(
        (country: WCountry) => country.name === e.target.value
      );

      if (!country) return;

      values.name = country.name;
      values.slug = slugify(country.name, {
        lower: true,
      });
      values.iso2 = country.iso2;
      values.iso3 = country.iso3;
      values.currency = country.currency;
      values.long = country.longitude;
      values.lat = country.latitude;
      values.region = country.region;
    },
    [countries, values]
  );

  const [createCountry] = useMutation(CREATE_COUNTRY, {
    variables: values,
    update() {
      router.push(ROUTES.DASHBOARD_ADMIN_COUNTRIES);
    },
  });
  const { t: tCountry } = useTranslation("data/countries", false);

  return (
    <DashboardProvider
      title={`Destinations > Add ${values.name}`}
      currentUser={currentUser}
      buttons={
        <DashboardButton
          onClick={() => {
            router.push(ROUTES.DASHBOARD_ADMIN_COUNTRIES);
          }}
          mode={"darker"}
          prefix={<Icon name={"arrow-drop-left"} />}
        >
          Back
        </DashboardButton>
      }
    >
      <DashboardSection>
        <DashboardSectionTitle>{"Add a country"}</DashboardSectionTitle>
        <DashboardForm onSubmit={onSubmit}>
          <Row>
            <Col>
              <DashboardFieldGroup>
                <FormLabel>Country</FormLabel>
                <DashboardFieldContainer>
                  <CountrySelect name="country" onChange={onCountrySelect}>
                    <option value="">Select a country</option>
                    {countries.map((country: WCountry) => (
                      <option
                        key={tCountry(country.name)}
                        value={tCountry(country.name)}
                      >
                        {tCountry(country.name)}
                      </option>
                    ))}
                  </CountrySelect>
                </DashboardFieldContainer>
              </DashboardFieldGroup>
              <DashboardFieldGroup>
                <FormLabel htmlFor="description">Description</FormLabel>
                <DashboardFieldContainer>
                  <DashboardField
                    id={"description"}
                    name={"description"}
                    placeholder={"Le pays du soleil levant"}
                    onChange={onChange}
                  />
                </DashboardFieldContainer>
              </DashboardFieldGroup>
              <DashboardFieldGroup>
                <FormLabel htmlFor="thumbnail">Thumbnail</FormLabel>
                <DashboardFieldContainer>
                  <DashboardField
                    type={"text"}
                    id={"thumbnailUrl"}
                    name={"thumbnailUrl"}
                    placeholder={
                      "https://image-website.com/superbe-image-japon"
                    }
                    onChange={onChange}
                  />
                </DashboardFieldContainer>
              </DashboardFieldGroup>
            </Col>
            <Col>
              <DashboardFormThumbnailImage
                src={values.thumbnailUrl}
                alt={"Thumbnail Preview"}
              />
            </Col>
          </Row>
          <DashboardFormSubmitButton
            type="submit"
            disabled={!values.name}
            prefix={<Icon name={"add"} fill />}
          >
            Add country
          </DashboardFormSubmitButton>
        </DashboardForm>
      </DashboardSection>
    </DashboardProvider>
  );
};

DestinationAdd.getInitialProps = async () => {
  const { query: apolloQuery } = await getStandaloneApolloClient();
  const {
    data: { getWorldCountries: countries },
  }: { data: { getWorldCountries: WCountry[] } } = await apolloQuery({
    query: GET_WORLD_COUNTRIES,
  });

  return {
    countries: countries || [],
  };
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  :last-child {
    margin-left: 75px;
  }
`;

const FormLabel = styled(DashboardFieldLabel)`
  margin-right: 30px;
  margin-left: 25px;
`;

const CountrySelect = styled(DashboardSelect)`
  background-color: ${({ theme }) => theme.colors.layout.darker};
`;

export default DestinationAdd;
