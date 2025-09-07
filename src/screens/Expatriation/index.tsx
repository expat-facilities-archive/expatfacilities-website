import LayoutContainer from "@components/Layout/Container";
import LayoutMain from "@components/Layout/Main";
import Head from "@components/Head";
import { NextPage } from "next";
import Wrapper from "@components/Wrapper";
import { City, Country } from "@typeDefs/destinations";
import { getStandaloneApolloClient } from "@services/apollo/client";
import {
  GET_COUNTRY_BY_SLUG,
  GET_COUNTRY_SUGGESTIONS,
} from "@queries/countries";
import Featured from "@components/Expatriation/Featured";
import styled from "styled-components";
import Background from "@components/Background";
import React from "react";
import { GET_SERVICES } from "@queries/services";
import { Service } from "@typeDefs/services";
import useTranslation from "@hooks/useTranslation";
import ExpatriationPick from "@components/Expatriation/Pick";
import CommunityCarousel from "@components/Carousel/Community";
import DestinationCarousel from "@components/Carousel/Destination";
import FeaturedSearchbar from "@components/Home/Featured/Searchbar";
import Ambassador from "@components/Home/Ambassador";
import { useQuery } from "@apollo/client";
import { addDays, addMonths } from "date-fns";

interface Props {
  data: {
    getCountryBySlug: Country;
    getServices: Service[];
    getCountrySuggestions: Country[] | [];
  };
  query: any;
}

const Expatriation: NextPage<Props> = ({
  data: {
    getCountryBySlug: country,
    getServices: services,
    getCountrySuggestions: suggestions,
  },
  query,
}: Props) => {
  const { t: tCountry } = useTranslation("data/countries", false);
  const { t: tData } = useTranslation("data/services");

  const [selectedCity, setSelectedCity] = React.useState<City | null>(
    query.citySlug
      ? (country.cities.find((city) => city.slug === query.citySlug) as City)
      : null
  );

  const inTwoWeek = addDays(new Date(), 7 * 2);
  const inSixMonth = addMonths(inTwoWeek, 6);
  const [checkInDate, setCheckInDate] = React.useState<Date>(
    query.checkInDate ? new Date(query.checkInDate) : inTwoWeek
  );
  const [checkOutDate, setCheckOutDate] = React.useState<Date>(
    query.checkOutDate ? new Date(query.checkOutDate) : inSixMonth
  );

  const { data: servicesData } = useQuery(GET_SERVICES, {
    variables: {
      countryIso2: country.iso2,
      checkInDate: checkInDate || inTwoWeek,
      checkOutDate: checkOutDate || inSixMonth,
    },
  });

  const currentServices = servicesData?.getServices || services;

  return (
    <Wrapper>
      <LayoutMain>
        <Head
          title={"Expatriation"}
          subtitle={`${selectedCity ? `${selectedCity.name} - ` : ""}${tCountry(
            country.name
          )}`}
          description={country.description}
          thumbnailUrl={country.thumbnailUrl}
          keywords={[
            tCountry(country.name),
            ...country.cities.map((city) => city.name),
            ...services.map((s) => tData(s.name)),
          ]}
        />
        <Container>
          <Background src={country.thumbnailUrl} />
          <Featured data={country} />
          <ExpatriationPick
            country={country}
            services={currentServices}
            query={query}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            checkInDate={{
              value: checkInDate,
              setValue: setCheckInDate,
            }}
            checkOutDate={{
              value: checkOutDate,
              setValue: setCheckOutDate,
            }}
          />
        </Container>
        {suggestions && suggestions.length >= 4 && (
          <DestinationCarousel countries={suggestions} />
        )}
        <FeaturedSearchbar />
        <Container>
          <Ambassador />
          <CommunityCarousel />
        </Container>
      </LayoutMain>
    </Wrapper>
  );
};

const Container = styled(LayoutContainer)`
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 0;
    width: 100%;
  }
`;

Expatriation.getInitialProps = async ({ query }) => {
  const { countrySlug, checkInDate, checkOutDate } = query;

  const inTwoWeek = new Date();
  inTwoWeek.setDate(inTwoWeek.getDate() + 7 * 2);
  const inSixMonth = new Date();
  inSixMonth.setMonth(inSixMonth.getMonth() + 6);

  const { query: apolloQuery } = await getStandaloneApolloClient();
  const { data: country }: { data: { getCountryBySlug: Country } } =
    await apolloQuery({
      query: GET_COUNTRY_BY_SLUG,
      variables: {
        countrySlug,
      },
    });

  const { data: services }: { data: { getServices: Service[] } } =
    await apolloQuery({
      query: GET_SERVICES,
      variables: {
        countryIso2: country.getCountryBySlug.iso2,
        checkInDate: checkInDate || inTwoWeek,
        checkOutDate: checkOutDate || inSixMonth,
      },
    });

  const {
    data: countrySuggestions,
  }: { data: { getCountrySuggestions: Country[] } } = await apolloQuery({
    query: GET_COUNTRY_SUGGESTIONS,
    variables: {
      amount: 10,
      countryId: country.getCountryBySlug.id,
    },
  });

  return { data: { ...country, ...services, ...countrySuggestions }, query };
};

export default Expatriation;
