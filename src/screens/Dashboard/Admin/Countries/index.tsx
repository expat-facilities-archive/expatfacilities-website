import { NextPage } from "next";
import styled from "styled-components";
import React from "react";
import { Country } from "src/types/destinations";
import Loading from "@components/Layout/Loading";
import DashboardDestinationListCard from "@components/Dashboard/Admin/Countries/List/Card";
import DashboardProvider from "@components/Dashboard/Provider";
import router from "next/router";
import ROUTES from "@constants/routes";
import { GET_COUNTRIES } from "@queries/countries";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { DashboardButton } from "@components/Layout/Dashboard";
import { DashboardPage } from "@typeDefs/auth";
import useTranslation from "@hooks/useTranslation";
import Icon from "@components/Layout/Icon";

interface Props extends DashboardPage {
  data: { getCountries: Country[] };
}

const Countries: NextPage<Props> = ({ currentUser, data }: Props) => {
  const { t: tOverview } = useTranslation("dashboard/overview");
  const { t: tCountry } = useTranslation("data/countries", false);
  const [countries] = React.useState<Country[]>(data.getCountries || []);

  const regions: string[] = [];

  countries.map((country) => {
    const name: string = country.region.name;
    if (!regions.includes(name)) regions.push(name);
  });

  // const handleSearchBarChange = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     const value = event.target.value;
  //     const countries = data.getCountries.filter((country: Country) =>
  //       country.name.toLowerCase().startsWith(value.toLowerCase())
  //     );
  //     setCountries(countries);
  //   },
  //   []
  // );

  return (
    <DashboardProvider
      title={tOverview("sidebar.countries")}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
            prefix={<Icon name={"search-2"} />}
          >
            Search
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_ADMIN_COUNTRIES_ADD);
            }}
            prefix={<Icon name={"add"} fill />}
          >
            Ajouter un pays
          </DashboardButton>
        </>
      }
    >
      {/* <SearchBar
        type={"text"}
        placeholder={"Search a country"}
        onChange={handleSearchBarChange}
      /> */}
      {data ? (
        data.getCountries && countries.length > 0 ? (
          <Container>
            <Filter>
              <FilterIcon name="filter-2" fill size={18} />
              Filtrer par
              <FilterButton
                onClick={() => {
                  router.push("#");
                }}
                suffix={<Icon name={"arrow-up-s"} />}
              >
                Pays
              </FilterButton>
            </Filter>
            {regions.map((region) => (
              <>
                <RegionName>{region}</RegionName>
                <DestinationList>
                  {countries
                    .filter((country) => country.region.name === region)
                    .map(({ name, slug, thumbnailUrl }: Country, i: number) => (
                      <DashboardDestinationListCard
                        key={i}
                        name={tCountry(name)}
                        slug={slug}
                        imageUrl={thumbnailUrl}
                      />
                    ))}
                </DestinationList>
              </>
            ))}
          </Container>
        ) : (
          <NoCountriesMessage>
            {"Il n'y a pas de destinations enregistrées"}
          </NoCountriesMessage>
        )
      ) : (
        <Loading />
      )}
    </DashboardProvider>
  );
};

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterButton = styled(DashboardButton)`
  margin-left: 15px;
  padding: 5px 10px;
`;

const FilterIcon = styled(Icon)`
  margin-right: 15px;
`;

const Container = styled.div`
  padding: 0 15px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 30px;
  }
`;

const RegionName = styled.h3`
  line-height: 30px;
  margin-bottom: 11px;
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.medium};
`;

// const SearchBar = styled(DashboardField)`
//   border-radius: 0;
//   margin-right: 6px;
//   align-self: end;
// `;

const DestinationList = styled.div`
  display: grid;
  grid-gap: 15px;
  margin-bottom: 50px;
  grid-template-columns: repeat(auto-fill, 100px);
  grid-template-rows: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    justify-content: center;
  }
`;

const NoCountriesMessage = styled.p`
  display: inline-block;
  margin: auto;
`;

Countries.getInitialProps = async () => {
  const { cache, query } = await getStandaloneApolloClient();
  const { data }: { data: { getCountries: Country[] } } = await query({
    query: GET_COUNTRIES,
  });

  return {
    apolloStaticCache: cache.extract(),
    data,
  };
};

export default Countries;
