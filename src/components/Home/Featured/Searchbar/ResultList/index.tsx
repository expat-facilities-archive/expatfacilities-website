import { useQuery } from "@services/apollo/static-client";
import Skeleton from "@components/Layout/Skeleton";
import useTranslation from "@hooks/useTranslation";
import { City, Country } from "@typeDefs/destinations";
import Cookies from "js-cookie";
import React from "react";
import styled from "styled-components";

interface Props {
  location: {
    slug: string | null;
    name: string;
  };
  setLocation: React.Dispatch<
    React.SetStateAction<{
      slug: string | null;
      name: string;
    }>
  >;
}

const ResultList: React.FC<Props> = ({
  location: { name: query },
  setLocation,
}: Props) => {
  const { data } = useQuery(RESULT_LIST_QUERY);

  const countries = data?.getCountries;
  const cities = data?.getCities;

  const { t: tCountry } = useTranslation("data/countries", false);

  const searchHistory = JSON.parse(Cookies.get("search_history") || "[]");

  const addToHistory = (item: any) => {
    // check if item is already in history
    const index = searchHistory.findIndex((i: any) => i.id === item.id);

    const newHistory = [
      ...searchHistory,
      ...(index === -1
        ? [
            {
              __typename: item.__typename,
              id: item.id,
            },
          ]
        : []),
    ];

    // if the amount of items in history is more than 10, remove the first item
    if (newHistory.length > 10) {
      Cookies.set(
        "search_history",
        JSON.stringify(newHistory.slice(1, newHistory.length))
      );
    } else {
      Cookies.set("search_history", JSON.stringify(newHistory));
    }
  };

  /*   const history =  */

  const renderCard = (item: any): JSX.Element => {
    if (!item)
      return (
        <Card>
          <CardTitle as={Skeleton} />
        </Card>
      );

    if (item.__typename === "Country") {
      return (
        <Card
          key={item.id}
          onClick={() => {
            setTimeout(() => {
              setLocation({
                ...location,
                name: tCountry(item.name),
                slug: item.slug,
              });
              // add to search history
              addToHistory(item);
            }, 100);
          }}
        >
          <CardTitle>
            {tCountry(item.name)}{" "}
            {item.cities && (
              <CardDescription marginLeft>
                {" - " + item.cities.map((city: City) => city.name).join(", ")}
              </CardDescription>
            )}
          </CardTitle>
        </Card>
      );
    }

    if (item.__typename === "City") {
      return (
        <Card
          key={item.id}
          onClick={() => {
            setTimeout(() => {
              setLocation({
                ...location,
                name: `${item.name}, ${tCountry(item.country.name)}`,
                slug: `${item.country.slug}/${item.slug}`,
              });
              // add to search history
              addToHistory(item);
            }, 100);
          }}
        >
          <CardTitle>
            {item.name}{" "}
            {item.country && (
              <CardDescription>
                {", " + tCountry(item.country.name)}
              </CardDescription>
            )}
          </CardTitle>
        </Card>
      );
    }

    return <></>;
  };

  const search = (list: any[], query: string) => {
    const results = list.filter((item) =>
      tCountry(item.name)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          query
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        )
    );
    results.sort((a, b) => {
      if (tCountry(a.name) < tCountry(b.name)) {
        return -1;
      }
      if (tCountry(a.name) > tCountry(b.name)) {
        return 1;
      }
      return 0;
    });

    return results;
  };

  const results =
    countries && cities
      ? query.length > 0
        ? [...search(countries, query), ...search(cities, query)]
        : searchHistory
            .map((item: { __typename: string; id: string }) => {
              if (item.__typename === "Country") {
                return countries.find(
                  (country: Country) => country.id === item.id
                );
              }
              if (item.__typename === "City") {
                return cities.find((city: City) => city.id === item.id);
              }
            })
            .reverse()
      : query.length > 0
      ? Array(5).fill(undefined)
      : searchHistory.length > 0
      ? Array(searchHistory.length).fill(undefined)
      : [];

  results.splice(10);

  if (results && results.length > 0) {
    return (
      <Container>{results.map((item: any) => renderCard(item))}</Container>
    );
  } else {
    return <></>;
  }
};

const Container = styled.ul`
  position: absolute;
  top: 50%;
  left: 0;
  padding-top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  z-index: -100;
  overflow: hidden;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const Card = styled.li`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 8px 8px;
  cursor: pointer;
  transition: all 0.2s;
  :hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

const CardTitle = styled.p`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  max-width: 100%;
  white-space: nowrap;
`;

const CardDescription = styled.span<{ marginLeft?: boolean }>`
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.size.small};
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ marginLeft }) => marginLeft && "margin-left: 4px;"};
`;

const RESULT_LIST_QUERY = `
  query ResultListQuery {
    getCities {
      id
      name
      slug
      country {
        id
        name
        slug
      }
    }
    getCountries {
      id
      slug
      name
      cities {
        id
        name
      }
    }
  }
`;

export default ResultList;
