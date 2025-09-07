import { NextPage } from "next";
import React from "react";
import DashboardProvider from "@components/Dashboard/Provider";
import { DashboardPage } from "@typeDefs/auth";
import { getAuthApolloClient } from "@services/apollo/client";
import { GET_USERS } from "@queries/users";
import UserChart from "@components/Dashboard/Admin/Chart/User";
import { GET_TRIPS } from "@queries/trips";
import TripChart from "@components/Dashboard/Admin/Chart/Trip/Created";
import styled from "styled-components";
import { DashboardButton } from "@components/Layout/Dashboard";
import DashboardTable, { Column } from "@components/Dashboard/Table";
import PopularServiceChart from "@components/Dashboard/Admin/Chart/Service/Popular";
import { Trip } from "@typeDefs/destinations";

import AdminBoardList from "../../../components/Dashboard/Admin/List";
import { formatAmount } from "@utils/formatAmount";
import useTranslation from "@hooks/useTranslation";
import DashboardLabel, { LabelType } from "@components/Dashboard/Label";

interface Props extends DashboardPage {
  data: { getUsers: any[]; getTrips: Trip[] };
}

const DashboardAdmin: NextPage<Props> = ({
  currentUser,
  data: { getUsers: users, getTrips: trips },
}: Props) => {
  const [daysLength, setDaysLength] = React.useState<number>(30);
  const [currentGraphState, setCurrentGraphState] = React.useState<graphState>(
    graphState.USER_CREATED
  );

  const { t: tCountry } = useTranslation("data/countries");
  const { t: tSell } = useTranslation("dashboard/sell");

  const target = "user.id";

  const columns: Column[] = [
    {
      key: 1,
      title: tSell("user"),
      format: ({ user }: Trip) => {
        return `${user.firstName} ${user.lastName}`;
      },
      width: 1,
    },
    {
      key: 2,
      title: tSell("amount"),
      format: ({ totalPrice }: Trip) => formatAmount(totalPrice),
      width: 1,
      isBold: true,
    },
    {
      key: 3,
      title: tSell("country"),
      format: ({ city }: Trip) => tCountry(city.country.name),
      width: 1,
    },
    {
      key: 4,
      title: tSell("departure"),
      format: ({ date }: Trip) =>
        new Date(date.start).toLocaleDateString("fr-FR"),
      width: 1,
    },
    {
      // TODO: adapte with the new state name
      key: 5,
      title: tSell("status"),
      format: () => (
        <DashboardLabel type={LabelType.WARNING} content={"En attente"} />
      ),
      width: 1,
    },
    // TODO add nb command
    // {
    //   key: 6,
    //   title: "Nº Com.",
    //   format: ,
    //   width: 1,
    // },
    {
      key: 7,
      title: tSell("date"),
      format: ({ date }: Trip) =>
        new Date(date.creation).toLocaleDateString("fr-FR"),
      width: 1,
    },
  ];

  return (
    <DashboardProvider
      title={"Dashboard"}
      currentUser={currentUser}
      buttons={
        <>
          <LengthButton
            onClick={() => {
              setDaysLength(30);
            }}
            active={daysLength == 30}
          >
            {"30 days"}
          </LengthButton>
          <LengthButton
            onClick={() => {
              setDaysLength(90);
            }}
            active={daysLength == 90}
          >
            {"90 days"}
          </LengthButton>
          <LengthButton
            onClick={() => {
              setDaysLength(365);
            }}
            active={daysLength == 365}
          >
            {"365 days"}
          </LengthButton>
        </>
      }
    >
      <AdminBoardList
        setCurrentGraphState={setCurrentGraphState}
        users={users}
        trips={trips}
      />

      <Section>
        <ChartContainer>
          {
            {
              [graphState.USER_CREATED]: (
                <UserChart users={users} daysLength={daysLength} />
              ),
              [graphState.TRIP_CREATED]: (
                <TripChart trips={trips} daysLength={daysLength} />
              ),
              [graphState.MOST_POPULAR_SERVICE]: (
                <PopularServiceChart trips={trips} daysLength={daysLength} />
              ),
            }[currentGraphState]
          }
        </ChartContainer>
      </Section>

      <Section>
        <TripsContainer>
          <TripsTitle>{"Historique des voyages"}</TripsTitle>
          {trips && trips.length > 0 && (
            <DashboardTable
              header
              columns={columns}
              data={trips}
              tableGap={2}
              target={target}
            />
          )}
        </TripsContainer>
      </Section>
    </DashboardProvider>
  );
};

const LengthButton = styled(DashboardButton)<{ active?: boolean }>`
  color: ${({ active, theme }) => !active && `${theme.colors.text.light}`};
  background-color: ${({ active, theme }) =>
    active ? `${theme.colors.accent.light}` : `${theme.colors.layout.darker}`};
`;

const Section = styled.section`
  margin-top: 15px;
  display: flex;
  padding: 0 15px;
`;

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 300px;
  width: calc(100% - 15px * 2);
  border-radius: 5px;
  padding: 0 15px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
`;

const TripsTitle = styled.h1`
  padding: 0 15px;
`;

const TripsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 5px;
  padding: 15px 0;
`;

DashboardAdmin.getInitialProps = async (ctx) => {
  const { cache, query } = await getAuthApolloClient(ctx);
  const {
    data: { getUsers },
  }: { data: { getUsers: any[] } } = await query({
    query: GET_USERS,
  });

  const {
    data: { getTrips },
  }: { data: { getTrips: Trip[] } } = await query({
    query: GET_TRIPS,
  });

  return {
    apolloStaticCache: cache.extract(),
    data: { getUsers, getTrips },
  };
};

export enum graphState {
  USER_CREATED,
  TRIP_CREATED,
  MOST_POPULAR_SERVICE,
}

export default DashboardAdmin;
