import React from "react";

import { NextPage } from "next";

import DashboardProvider from "@components/Dashboard/Provider";
import { DashboardButton } from "@components/Layout/Dashboard";
import { getAuthApolloClient } from "@services/apollo/client";
import { GET_TRIPS } from "@queries/trips";

import type { DashboardPage } from "@typeDefs/auth";
import type { Trip } from "@typeDefs/destinations";
import { useRouter } from "next/router";
import useTranslation from "@hooks/useTranslation";
import { ShowBoxColor } from "@components/Dashboard/ShowBoxColor";
import DashboardTable, { Column } from "@components/Dashboard/Table";
import { formatAmount } from "@utils/formatAmount";
import Icon from "@components/Layout/Icon";

type Props = DashboardPage & {
  data: { getTrips: Trip[] };
};

const DashboardAdminTrips: NextPage<Props> = ({
  currentUser,
  data: { getTrips: trips },
}: Props) => {
  const router = useRouter();
  // const { t } = useTranslation("dashboard/trips");
  const { t: tCountry } = useTranslation("data/countries");
  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tOverview } = useTranslation("dashboard/overview");
  const { t: tSell } = useTranslation("dashboard/sell");

  const targetUser = "user.id";
  const targetTrip = "id";

  const columns: Column[] = [
    {
      key: 1,
      title: tSell("user"),
      format: ({ user }: Trip) => `${user.firstName}  ${user.lastName}`,
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
      format: ({ date }: Trip) => new Date(date.start).toLocaleDateString(),
      width: 1,
    },
    {
      // TODO adapte with the new state name
      key: 5,
      title: tSell("status"),
      format: ({ state }: Trip) =>
        ShowBoxColor(state, {
          replace_value: [
            tCommon("status.paid"),
            tCommon("status.pending"),
            tCommon("status.cancel"),
          ],
          isBoolean: false,
          transformMobile: true,
        }),
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
      format: ({ date }: Trip) => new Date(date.creation).toLocaleDateString(),
      width: 1,
    },
  ];

  return (
    <DashboardProvider
      title={tOverview("sidebar.sell-trip")}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
          >
            Montant
            <Icon name={"arrow-down-s"} />
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
          >
            Date de départ
            <Icon name={"arrow-down-s"} />
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push("#");
            }}
          >
            Pays
            <Icon name={"arrow-up-s"} />
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
          >
            Statut
            <Icon name={"arrow-down-s"} />
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
          >
            Ajd
            <Icon name={"arrow-down-s"} />
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
            prefix={<Icon name={"search-2"} />}
          >
            Search
          </DashboardButton>
        </>
      }
    >
      {trips && trips.length > 0 && (
        <DashboardTable
          header
          columns={columns}
          data={trips}
          tableGap={5}
          target={targetUser}
          target2={targetTrip}
        />
      )}
    </DashboardProvider>
  );
};

DashboardAdminTrips.getInitialProps = async (ctx) => {
  const { query } = await getAuthApolloClient(ctx);
  const { data }: { data: { getTrips: Trip[] } } = await query({
    query: GET_TRIPS,
  });

  return {
    data,
  };
};

export default DashboardAdminTrips;
