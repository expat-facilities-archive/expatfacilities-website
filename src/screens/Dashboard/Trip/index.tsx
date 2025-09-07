import { NextPage, NextPageContext } from "next";
import DashboardProvider from "@components/Dashboard/Provider";
import { GET_CURRENT_USER_TRIPS } from "@queries/trips";
import { DashboardPage } from "@typeDefs/auth";
import { Trip, TripState } from "@typeDefs/destinations";
import { getAuthApolloClient } from "@services/apollo/client";
import DashboardTable, { Column } from "@components/Dashboard/Table";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import React from "react";
import { formatAmount } from "@utils/formatAmount";
import BoxTrip from "@components/Dashboard/BoxTrip";
import TripCardList from "@components/Dashboard/Trip/TripCardList";
import useBreakpoint from "@hooks/useBreakpoint";
import DashboardTripLabel from "@components/Dashboard/Trip/Label";
import { DashboardButton } from "@components/Layout/Dashboard";
import ROUTES from "@constants/routes";
import { useRouter } from "next/router";

interface Props extends DashboardPage {
  trips: Trip[];
}

const DashboardTrip: NextPage<Props> = ({ currentUser, trips }: Props) => {
  const { t } = useTranslation("dashboard/overview");
  const { t: tTrip } = useTranslation("dashboard/trip");
  const { t: tCommon } = useTranslation("dashboard/common");
  const router = useRouter();

  const breakPoint = useBreakpoint();

  const target = "id";

  const columns: Column[] = [
    {
      key: 1,
      title: "",
      format: ({ city }: Trip) => {
        return <CountryPicture imageUrl={city.country.thumbnailUrl} />;
      },
      width: 0.4,
    },
    {
      key: 2,
      title: tTrip("list.city"),
      format: ({ city }: Trip) => city.name,
      width: 1,
    },
    {
      key: 3,
      title: tCommon("price"),
      format: ({ totalPrice }: Trip) => formatAmount(totalPrice),
      width: 1,
    },
    {
      key: 4,
      title: tTrip("list.nbservices"),
      format: ({ services }: Trip) => {
        return `${services.length} ${
          !breakPoint.isTablet
            ? services.length === 1
              ? tTrip("list.service")
              : tTrip("list.services")
            : ""
        }`;
      },
      width: 1,
    },
    {
      key: 5,
      title: "",
      format: ({ state }: Trip) => <DashboardTripLabel state={state} />,
      width: 1,
    },
  ];

  const renderTripList = () => {
    const sortedTrips: Trip[] = [...trips].sort((a) =>
      a.state === TripState.ARCHIVED ? 1 : -1
    );

    const featured: Trip = sortedTrips[0];
    const otherTrips: Trip[] = sortedTrips.slice(1);

    return (
      <>
        <BoxTrip trip={featured} />
        {breakPoint.isTablet ? (
          <TripCardList trips={otherTrips} />
        ) : (
          <DashboardTable
            columns={columns}
            data={otherTrips}
            tableGap={5}
            target={target}
            header
          />
        )}
      </>
    );
  };

  return (
    <>
      <DashboardProvider
        title={t("sidebar.trips")}
        currentUser={currentUser}
        buttons={
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DESTINATIONS);
            }}
          >
            {tTrip("overview.services.buttons.create")}
          </DashboardButton>
        }
      >
        {trips && trips.length > 0 ? (
          renderTripList()
        ) : (
          <NoTrip>{tTrip("list.notrip")}</NoTrip>
        )}
      </DashboardProvider>
    </>
  );
};

const NoTrip = styled.p`
  text-align: center;
  margin-top: 50px;
  width: 100%;
`;

const CountryPicture = styled.div<{ imageUrl: string }>`
  height: 45px;
  width: 45px;
  border-radius: 5px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

DashboardTrip.getInitialProps = async (ctx: NextPageContext) => {
  const { query } = await getAuthApolloClient(ctx);

  const { data }: { data: { getCurrentUserTrips: Trip[] } } = await query({
    query: GET_CURRENT_USER_TRIPS,
    // fetch with sort by most recent start date desc and trip state
    variables: {
      sort: {
        field: "date.start",
        direction: "asc",
      },
    },
  });

  return {
    trips: data.getCurrentUserTrips || [],
  };
};

export default DashboardTrip;
