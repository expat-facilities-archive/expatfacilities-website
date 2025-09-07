import {
  DashboardButton,
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardForm,
  DashboardFormSubmitButton,
} from "@components/Layout/Dashboard";
import { NextPage } from "next";
import ROUTES from "@constants/routes";
import DashboardProvider from "@components/Dashboard/Provider";
import { useForm } from "@hooks/useForm";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { City, Country } from "@typeDefs/destinations";
import router from "next/router";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { DELETE_CITY, GET_CITY_BY_SLUG, UPDATE_CITY } from "@queries/cities";
import { DashboardPage } from "@typeDefs/auth";
import styled from "styled-components";
import Icon from "@components/Layout/Icon";

interface Props extends DashboardPage {
  data: any;
}

const DestinationCityEdit: NextPage<Props> = ({
  currentUser,
  data: { getCityBySlug: city },
}: Props) => {
  const country: Country = city.country;

  const updateCityCallback = () => {
    updateCity({
      variables: { ...values, cityId: city.id, countryId: country.id }
    });
  };

  const { values, onChange, onSubmit } = useForm(updateCityCallback, {
    slug: city.slug,
    name: city.name,
  });

  const [updateCity] = useStaticMutation(UPDATE_CITY);

  const [deleteCity] = useStaticMutation(DELETE_CITY);

  return (
    <DashboardProvider
      title={`Destinations > ${country.name} > ${values.name}`}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              deleteCity({
                variables: {
                  cityId: city.id,
                }
              });
            }}
            red
            prefix={<Icon name={"delete-bin"} fill />}
          >
            Delete
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push(
                `${ROUTES.DASHBOARD_ADMIN_COUNTRIES}/${country.slug}`
              );
            }}
            mode={"darker"}
            prefix={<Icon name={"arrow-drop-left"} />}
          >
            Back
          </DashboardButton>
        </>
      }
    >
      {city ? (
        <>
          <DashboardForm onSubmit={onSubmit}>
            <Row>
              <DashboardFieldGroup>
                <FormLabel htmlFor="name">{"Country Name"}</FormLabel>
                <DashboardFieldContainer>
                  <DashboardField
                    type={"text"}
                    id={"name"}
                    name={"name"}
                    placeholder={"Japon"}
                    onChange={onChange}
                    value={values.name}
                  />
                </DashboardFieldContainer>
              </DashboardFieldGroup>
              <DashboardFieldGroup>
                <FormLabel htmlFor="slug">Slug</FormLabel>
                <DashboardFieldContainer>
                  <DashboardField
                    type={"text"}
                    id={"slug"}
                    name={"slug"}
                    placeholder="japon"
                    onChange={onChange}
                    value={values.slug}
                  />
                </DashboardFieldContainer>
              </DashboardFieldGroup>
            </Row>
            <DashboardFormSubmitButton
              type="submit"
              prefix={<Icon name={"save"} fill />}
            >
              {"Save city"}
            </DashboardFormSubmitButton>
          </DashboardForm>
        </>
      ) : (
        <div>{"This city doesn't exist"}</div>
      )}
    </DashboardProvider>
  );
};

const Row = styled.div`
  display: flex;
  align-self: center;
  margin-bottom: 30px;
`;

const FormLabel = styled(DashboardFieldLabel)`
  margin-right: 30px;
  margin-left: 25px;
  white-space: nowrap;
`;

DestinationCityEdit.getInitialProps = async ({ query }) => {
  const { citySlug: slug } = query;
  const { query: apolloQuery } = await getStandaloneApolloClient();

  const { data }: { data: { getCityBySlug: City } } = await apolloQuery({
    query: GET_CITY_BY_SLUG,
    variables: {
      slug,
    },
  });

  return { data };
};

export default DestinationCityEdit;
