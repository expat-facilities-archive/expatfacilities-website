import { NextPage } from "next";
import React, { useState } from "react";
import { DashboardPage } from "@typeDefs/auth";
import { GET_USER } from "@queries/users";
import { getAuthApolloClient } from "@services/apollo/client";
import DashboardProvider from "@components/Dashboard/Provider";
import { GET_USER_TRIPS } from "@queries/trips";
import Loading from "@components/Layout/Loading";
import styled, { useTheme } from "styled-components";
import { User } from "@typeDefs/user";
import { Trip } from "@typeDefs/destinations";
import { DashboardButton } from "@components/Layout/Dashboard";
import router from "next/router";
import ROUTES from "@constants/routes";
import DashboardTable, { Column } from "@components/Dashboard/Table";
import useTranslation from "@hooks/useTranslation";
import { ShowBoxColor } from "@components/Dashboard/ShowBoxColor";
import { reverseDate } from "@utils/reverseDate";
import { formatAmount } from "@utils/formatAmount";

import DocDisplay from "@components/Dashboard/DocDisplay";
import Profile from "@components/Dashboard/Profile";
import CardTrip from "@components/Dashboard/CardTrip";
import Icon from "@components/Layout/Icon";
import useBreakpoint from "@hooks/useBreakpoint";

interface Props extends DashboardPage {
  data: { getUser: User; getUserTrips: Trip[] };
}

const DashboardUserProfile: NextPage<Props> = ({
  data: { getUser: user, getUserTrips: trips },
  currentUser,
}: Props) => {
  const currentDate = new Date();

  const [tripsBeforeNow, _setTripsBeforeNow] = useState<Trip[]>(
    trips.filter((trip) => new Date(trip.date.end) <= currentDate)
  );
  const [tripsAfterNow, _setTripsAfterNow] = useState<Trip[]>(
    trips.filter((trip) => new Date(trip.date.end) >= currentDate)
  );

  const { t } = useTranslation("dashboard/trip");
  const { t: tCommon } = useTranslation("dashboard/common");
  // const { t: tDataService } = useTranslation("data/services");

  const theme = useTheme();
  const breakPoint = useBreakpoint();

  const target = "trip.id";
  // TODO define new route
  const routeTrip = `${ROUTES.DASHBOARD_ADMIN_USERS}/${user.id}`;

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
      title: "",
      format: ({ city }: Trip) => city.name,
      width: 1,
    },
    {
      key: 3,
      title: "",
      format: ({ services }: Trip) => {
        return `${services.length} ${
          services.length === 1 ? t("list.service") : t("list.services")
        }`;
      },
      width: 1,
    },
    {
      key: 4,
      title: "",
      format: ({ date }: Trip) => {
        return `${reverseDate(date.start)} - ${reverseDate(date.end)}`;
      },
      width: 1,
    },
    {
      // TODO adapte with the new state name
      key: 5,
      title: "",
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
    {
      key: 6,
      title: "",
      format: ({ totalPrice }: Trip) => formatAmount(totalPrice),
      width: 0.4,
    },
  ];
  return (
    <DashboardProvider
      title={`${tCommon("user")} > ${user.firstName} ${user.lastName}`}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_ADMIN_USERS);
            }}
            mode={"darker"}
            prefix={<Icon name={"arrow-drop-left"} />}
            // responsive={breakPoint.isTablet}
          >
            {!breakPoint.isTablet && tCommon("buttons.back")}
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push("#");
            }}
            prefix={<Icon name={"save"} />}
            // responsive={breakPoint.isTablet}
          >
            {!breakPoint.isTablet && tCommon("buttons.save")}
          </DashboardButton>
        </>
      }
    >
      <Display>
        <Header>
          <Profile user={user} />
          <DocDisplay
            docs={[
              {
                id: "1",
                content: "passport",
                url: "https://picsum.photos/200/300",
              },
              {
                id: "2",
                content: "visa",
                url: "https://picsum.photos/200/300",
              },
              {
                id: "3",
                content: "permis",
                url: "https://picsum.photos/200/300",
              },
            ]}
            background={theme.colors.layout.darker}
            padding={"15px"}
            largeDisplay={false}
          ></DocDisplay>
        </Header>
        <DisplayCards>
          {tripsAfterNow ? (
            tripsAfterNow.length > 0 ? (
              tripsAfterNow.map((trip) => (
                <CardTrip
                  key={trip.id}
                  id={trip.id}
                  city={trip.city.name}
                  status={"pending"}
                  price={trip.totalPrice}
                  service={trip.services.length}
                  startDate={trip.date.start}
                  endDate={trip.date.end}
                  url={trip.city.country.thumbnailUrl}
                  route={routeTrip}
                />
              ))
            ) : (
              <NoTrip>{`${t("home.user")} (${user.firstName} ${
                user.lastName
              }) ${t("home.nofuturtrip")}`}</NoTrip>
            )
          ) : (
            <Loading />
          )}
        </DisplayCards>
      </Display>
      {tripsBeforeNow ? (
        tripsBeforeNow.length > 0 ? (
          <DashboardTable
            columns={columns}
            data={tripsBeforeNow}
            tableGap={5}
            target={target}
            header
          />
        ) : (
          <NoTrip>{`${t("home.user")}  (${user.firstName} ${
            user.lastName
          })  ${t("home.notrip")}`}</NoTrip>
        )
      ) : (
        <Loading />
      )}
    </DashboardProvider>
  );
};

const Display = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  padding: 15px;
`;

const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
  }
`;

const DisplayCards = styled.div`
  display: grid;
  box-sizing: border-box;
  gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const NoTrip = styled.p`
  text-align: center;
  margin-top: 150px;
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

DashboardUserProfile.getInitialProps = async (ctx) => {
  const { userId } = ctx.query;

  const { query: apolloQuery } = await getAuthApolloClient(ctx);
  const { data: user }: { data: { getUser: any } } = await apolloQuery({
    query: GET_USER,
    variables: {
      id: userId,
    },
  });

  const { data: trips }: { data: { getUserTrips: any } } = await apolloQuery({
    query: GET_USER_TRIPS,
    variables: {
      id: userId,
    },
  });

  return { data: { ...user, ...trips } };
};

export default DashboardUserProfile;
