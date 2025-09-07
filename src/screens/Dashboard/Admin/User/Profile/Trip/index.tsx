import { NextPage } from "next";
import React from "react";
import { DashboardPage } from "@typeDefs/auth";
import { GET_USER } from "@queries/users";
import { getAuthApolloClient } from "@services/apollo/client";
import DashboardProvider from "@components/Dashboard/Provider";
import { GET_TRIP } from "@queries/trips";
import Loading from "@components/Layout/Loading";
import styled, { useTheme } from "styled-components";
import { User } from "@typeDefs/user";
import { PartialTripService, Trip, TripService } from "@typeDefs/destinations";
import { DashboardButton } from "@components/Layout/Dashboard";
import router from "next/router";
import ROUTES from "@constants/routes";
import DashboardTable, { Column } from "@components/Dashboard/Table";
import useTranslation from "@hooks/useTranslation";
import { ShowBoxColor } from "@components/Dashboard/ShowBoxColor";

import ProgressBar from "@components/Dashboard/ProgressBar";
import DocDisplay from "@components/Dashboard/DocDisplay";
import Profile from "@components/Dashboard/Profile";
import Icon from "@components/Layout/Icon";
import useBreakpoint from "@hooks/useBreakpoint";

interface Props extends DashboardPage {
  data: { getUser: User; getTrip: Trip };
}

const DashboardUserProfileTrip: NextPage<Props> = ({
  data: { getUser: user, getTrip: trip },
  currentUser,
}: Props) => {
  // const [dataTrip, setDataTrip] = useState(trips);
  const { t } = useTranslation("dashboard/trip");
  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tDataService } = useTranslation("data/services");

  const theme = useTheme();
  const breakPoint = useBreakpoint();

  const targetService = "id";

  const [services, _setServices] = React.useState<
    TripService[] | PartialTripService[]
  >(trip.services.map((service) => service));

  const columnsAfter: Column[] = [
    {
      key: 1,
      title: "",
      format: ({ service }: TripService) => {
        return <CountryPicture imageUrl={service.thumbnailUrl} />;
      },
      width: 0.4,
    },
    {
      key: 2,
      title: "Service name",
      format: ({ service }: TripService) => tDataService(service.name),
      width: 1,
    },
    {
      key: 3,
      title: "Status",
      format: ({ state }: TripService) => {
        return ShowBoxColor(state, {
          replace_value: [
            tCommon("status.paid"),
            tCommon("status.pending"),
            tCommon("status.cancel"),
          ],
          isBoolean: false,
          transformMobile: true,
        });
      },
      width: 1,
      justifyEnd: true,
    },
    {
      key: 4,
      title: "Description",
      format: ({ service }: TripService) => tDataService(service.description),
      width: 1,
      displayNoneTablet: true,
    },
    {
      key: 5,
      title: "Price",
      format: ({ service, totalPrice }: TripService) => {
        console.table({
          "service price": service.price,
          "total price": totalPrice,
          "starting price": service.startingPrice,
        });
      },
      width: 1,
    },
  ];
  return (
    <DashboardProvider
      title={`${tCommon("user")} > ${user.firstName} ${user.lastName} > ${
        trip.city.name
      }`}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              router.push(`${ROUTES.DASHBOARD_ADMIN_USERS}/${user.id}`);
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
            prefix={<Icon name={"save"} fill />}
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
        <BoxProgressBar>
          <ProgressBar
            name={
              <TitleBox>
                {t("list.tripto")} {trip.city.name}
              </TitleBox>
            }
            steps={[
              { id: 1, title: "Incomplet", percent: 0, content: "14 mai 2022" },
              { id: 2, title: "Complété", percent: 25, content: "17 mai 2022" },
              { id: 3, title: "Payé", percent: 50, content: "" },
              { id: 4, title: "En validation", percent: 75, content: "" },
              { id: 5, title: "Terminé", percent: 100, content: "" },
            ]}
            progress={25}
          />
        </BoxProgressBar>
      </Display>
      {services ? (
        services.length > 0 ? (
          <DashboardTable
            columns={columnsAfter}
            data={services}
            tableGap={5}
            target={targetService}
            header
          />
        ) : (
          <NoTrip>
            {`${t("home.user")} 
          (${user.firstName} 
            ${user.lastName}) 
            ${t("home.notrip")}`}
          </NoTrip>
        )
      ) : (
        <Loading />
      )}
    </DashboardProvider>
  );
};

const TitleBox = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
  line-height: 30px;
`;

const Display = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  padding: 15px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  gap: 20px;
  & > div {
    width: calc(50% - 20px);
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
    & > div {
      width: 100%;
    }
  }
`;

const BoxProgressBar = styled.div`
  padding: 15px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  background-color: ${({ theme }) => theme.colors.layout.darker};
`;

const NoTrip = styled.p`
  text-align: center;
  margin-top: 200px;
`;

const CountryPicture = styled.div<{ imageUrl: string }>`
  height: 45px;
  width: 45px;
  border-radius: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
`;

DashboardUserProfileTrip.getInitialProps = async (ctx) => {
  const { userId, tripId } = ctx.query;

  const { query: apolloQuery } = await getAuthApolloClient(ctx);
  const { data: user }: { data: { getUser: any } } = await apolloQuery({
    query: GET_USER,
    variables: {
      id: userId,
    },
  });

  const { data: trip }: { data: { getTrip: any } } = await apolloQuery({
    query: GET_TRIP,
    variables: {
      tripId: tripId,
    },
  });

  return { data: { ...user, ...trip } };
};

export default DashboardUserProfileTrip;
