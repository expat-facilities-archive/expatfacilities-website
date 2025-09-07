import React from "react";

import { NextPage } from "next";

import DashboardProvider from "@components/Dashboard/Provider";
import { DashboardButton } from "@components/Layout/Dashboard";
import { getAuthApolloClient } from "@services/apollo/client";
import { GET_TRIPS } from "@queries/trips";

import type { DashboardPage } from "@typeDefs/auth";
import type { Trip } from "@typeDefs/destinations";
import useTranslation from "@hooks/useTranslation";
import { ShowBoxColor } from "@components/Dashboard/ShowBoxColor";
import DashboardTable, { Column } from "@components/Dashboard/Table";
import { formatAmount } from "@utils/formatAmount";
import router from "next/router";
import Icon from "@components/Layout/Icon";

type Props = DashboardPage & {
  data: { getTrips: Trip[] };
};

const DashboardAdminTripsServices: NextPage<Props> = ({
  currentUser,
  data: { getTrips: trips },
}: Props) => {
  // const { t } = useTranslation("dashboard/trips");
  const { t: tCountry } = useTranslation("data/countries");
  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tOverview } = useTranslation("dashboard/overview");
  const { t: tSell } = useTranslation("dashboard/sell");

  const target = "user.id";
  const target2 = "id";
  const target3 = "services.id";

  //   TODO add filter system here and fix the redirection to user(id)/trip(trip.id)/service(service.id)
  // const [data, setData] = useState<Trip[]>(
  //   trips
  //     .map((trip) => trip.services.map((service) => service))
  //     .filter((type: string) => type === "transportation")
  // );

  const handleSelectCategory = (string: string) => {
    console.log(`click on ${string}`);
  };

  const columns: Column[] = [
    {
      key: 1,
      title: tSell("user"),
      format: ({ user }: Trip) => `${user.firstName} ${user.lastName}`,
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
      // TODO adapte with the new state name
      key: 5,
      title: tSell("status-service"),
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
      format: ({ date }: Trip) =>
        new Date(date.creation).toLocaleDateString("fr-FR"),
      width: 1,
    },
  ];

  return (
    <DashboardProvider
      title={tOverview("sidebar.sell-trip-service")}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              handleSelectCategory("transport");
            }}
          >
            Transportation
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              handleSelectCategory("logement");
            }}
          >
            Housing
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              handleSelectCategory("ambassador");
            }}
          >
            Ambassador
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              handleSelectCategory("visa");
            }}
          >
            Visa
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              handleSelectCategory("insurance");
            }}
          >
            Insurance
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              handleSelectCategory("classe");
            }}
          >
            Language courses
          </DashboardButton>
          <DashboardButton
            mode={"darker"}
            onClick={() => {
              router.push("#");
            }}
          >
            <Icon name={"search-2"} />
            Search
          </DashboardButton>
        </>
      }
    >
      {trips && trips.length > 0 && (
        <DashboardTable
          columns={columns}
          data={trips}
          tableGap={5}
          target={target}
          target2={target2}
          target3={target3}
          header
        />
      )}
    </DashboardProvider>
  );
};

DashboardAdminTripsServices.getInitialProps = async (ctx) => {
  const { query } = await getAuthApolloClient(ctx);
  const { data }: { data: { getTrips: Trip[] } } = await query({
    query: GET_TRIPS,
  });

  return {
    data,
  };
};

export default DashboardAdminTripsServices;
