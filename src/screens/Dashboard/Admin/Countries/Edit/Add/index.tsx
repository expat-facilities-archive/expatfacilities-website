import {
  DashboardButton,
  DashboardFieldContainer,
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardForm,
  DashboardFormSubmitButton,
  DashboardSelect,
} from "@components/Layout/Dashboard";
import { NextPage } from "next";
import router from "next/router";
import ROUTES from "@constants/routes";
import DashboardProvider from "@components/Dashboard/Provider";
import { useForm } from "@hooks/useForm";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { GET_COUNTRY_BY_SLUG } from "src/queries/countries";
import { Country } from "@typeDefs/destinations";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { CREATE_CITY } from "@queries/cities";
import { DashboardPage } from "@typeDefs/auth";
import { useCallback, ChangeEvent } from "react";
import slugify from "slugify";
import { WCity } from "@typeDefs/world-cities";
import styled from "styled-components";
import Icon from "@components/Layout/Icon";

type Props = DashboardPage & {
  country: Country;
  cities: WCity[];
};

const DestinationCityAdd: NextPage<Props> = ({
  currentUser,
  country,
  cities,
}: Props) => {
  const createCityCallback = () => {
    if (!values.name) return;

    createCity({ variables: { countryId: country.id, ...values } });
  };

  const { values, onSubmit } = useForm(createCityCallback, {
    name: "",
    slug: "",
    latitude: 0.0,
    longitude: 0.0,
  });

  const onCitySelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const city = cities.find((city) => city.id == e.target.value);
      if (!city) return;

      values.name = city.name;
      values.slug = slugify(city.name, {
        lower: true,
      });
      values.latitude = parseFloat(city.latitude);
      values.longitude = parseFloat(city.longitude);
    },
    [cities, values]
  );

  const [createCity] = useStaticMutation(CREATE_CITY);

  return (
    <DashboardProvider
      title={`Destinations > ${country.name} > Add ${values.name}`}
      currentUser={currentUser}
      buttons={
        <DashboardButton
          onClick={() => {
            router.push(`${ROUTES.DASHBOARD_ADMIN_COUNTRIES}/${country.slug}`);
          }}
          mode={"darker"}
          prefix={<Icon name={"arrow-drop-left"} />}
        >
          Back
        </DashboardButton>
      }
    >
      <DashboardForm onSubmit={onSubmit}>
        <Row>
          <DashboardFieldGroup>
            <DashboardFieldContainer>
              <FormLabel>City</FormLabel>
              <DashboardSelect
                name={"city"}
                onChange={onCitySelect}
                defaultValue={""}
              >
                <option key="" value="" disabled>
                  Select a city
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </DashboardSelect>
            </DashboardFieldContainer>
          </DashboardFieldGroup>
        </Row>
        <DashboardFormSubmitButton
          type="submit"
          prefix={<Icon name={"add"} fill />}
        >
          Add city
        </DashboardFormSubmitButton>
      </DashboardForm>
    </DashboardProvider>
  );
};

const Row = styled.div`
  display: flex;
  align-self: center;
  margin-bottom: 30px;
`;

const FormLabel = styled(DashboardFieldLabel)`
  margin-right: 15px;
`;

DestinationCityAdd.getInitialProps = async ({ query }) => {
  const { countrySlug } = query;
  const client = await getStandaloneApolloClient();
  const { cache, query: apolloQuery } = client;
  const {
    data: { getCountryBySlug: country },
  }: { data: { getCountryBySlug: Country } } = await apolloQuery({
    query: GET_COUNTRY_BY_SLUG,
    variables: {
      countrySlug,
    },
  });

  const res = await fetch(
    "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bcities.json"
  );
  const allCities = await res.json();

  const matchingCountries = allCities.filter(
    (c: any) => c.iso2 === country.iso2
  );

  const cities = matchingCountries.map((c: any) => c.cities);

  const citiesFlat = cities.reduce((acc: any, val: any) => acc.concat(val), []);

  return {
    apolloStaticCache: cache.extract(),
    country,
    cities: citiesFlat || [],
  };
};

export default DestinationCityAdd;
