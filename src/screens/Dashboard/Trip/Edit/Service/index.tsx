import { DashboardButton } from "@components/Layout/Dashboard";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";
import DashboardProvider from "@components/Dashboard/Provider";
import { GET_TRIP } from "@queries/trips";
import React from "react";
import { getAuthApolloClient } from "@services/apollo/client";
import { Trip, TripService } from "@typeDefs/destinations";
import { DashboardPage } from "@typeDefs/auth";
import { GET_SERVICE_BY_TYPE } from "@queries/services";
import { Service } from "@typeDefs/services";
import TripServiceForm from "@components/Dashboard/Trip/Service/Form";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import { formatAmount } from "@utils/formatAmount";
import Icon from "@components/Layout/Icon";
import useBreakpoint from "@hooks/useBreakpoint";
import DashboardTripServiceProgress from "@components/Dashboard/Trip/Service/Progress";

interface Props extends DashboardPage {
  data: {
    trip: Trip;
    service: Service;
  };
}

const TripServicePage: NextPage<Props> = ({
  currentUser,
  data: { trip, service },
}: Props) => {
  const breakPoint = useBreakpoint();

  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tData } = useTranslation("data/services");
  const { t: tDetail } = useTranslation("expatriation/country");

  const router = useRouter();

  const [totalAmount, setTotalAmount] = React.useState<number>(0);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  isLoading;
  setIsLoading;

  const tripService = trip.services.find(
    (s: TripService) => s.service.id == service.id
  );

  return (
    <DashboardProvider
      currentUser={currentUser}
      title={`${tCommon("trip")} > ${trip.city.name} > ${tCommon(
        "service"
      )} > ${tData(service.name)}`}
      buttons={
        <DashboardButton
          onClick={() => {
            router.push(`${ROUTES.DASHBOARD_TRIPS}/${trip.id}`);
          }}
          mode={"darker"}
          prefix={<Icon name={"arrow-drop-left"} />}
          responsive={breakPoint.isTablet}
        >
          {!breakPoint.isTablet && tCommon("buttons.back")}
        </DashboardButton>
      }
    >
      <DisplayServiceMain column={4}>
        <BoxElements gridArea={"banner"}>
          <DashboardTripServiceProgress service={service} />
        </BoxElements>

        <DisplayAdmin column={2} gridArea={"user"}>
          <BoxElements gridArea={"form"}>
            {
              {
                unknown: (
                  <TripServiceForm
                    mode="add"
                    service={service}
                    tripId={trip.id}
                    type={service.type}
                    setTotalAmount={setTotalAmount}
                  />
                ),
                drafted: (
                  <TripServiceForm
                    mode="complete"
                    service={service}
                    tripService={tripService}
                    tripId={trip.id}
                    type={service.type}
                    setTotalAmount={setTotalAmount}
                  />
                ),
                completed: null,
                canceled: null,
              }[tripService?.state || "unknown"]
            }
          </BoxElements>
        </DisplayAdmin>

        <DisplayServiceFlex gridArea={"review"}>
          <BoxPrice>
            <TitlePrice>{tDetail("details.price")}</TitlePrice>
            <Price>{formatAmount(totalAmount)}</Price>
          </BoxPrice>
        </DisplayServiceFlex>
      </DisplayServiceMain>
    </DashboardProvider>
  );
};

const DisplayService = styled.div<{
  column?: number;
  gridArea?: string;
}>`
  display: grid;
  grid-template-columns: repeat(${({ column }) => column}, 1fr);
  grid-template-rows: auto;
  gap: 20px;
  grid-area: ${({ gridArea }) => gridArea};
`;

const DisplayServiceFlex = styled.div<{
  gridArea?: string;
}>`
  display: flex;
  flex-flow: column nowrap;
  height: calc(100% - 15px);
  grid-area: ${({ gridArea }) => gridArea};
`;

const DisplayServiceMain = styled(DisplayService)`
  padding: 15px;
  grid-template-areas:
    "banner banner banner banner"
    "user user user review"
    "user user user review"
    "user user user save";
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-areas:
      "banner banner banner banner"
      "review review review review"
      "user user user user"
      "user user user user"
      "save save save save";
  }
`;

const DisplayAdmin = styled(DisplayService)`
  grid-template-areas:
    "form form"
    "comment comment"
    "doc doc";
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-areas:
      "form form"
      "comment comment"
      "doc doc";
  }
`;

const BoxElementsDisplay = styled.div<{
  gridArea?: string;
  justify?: string;
  align?: string;
}>`
  grid-area: ${({ gridArea }) => gridArea};
  justify-self: ${({ justify }) => justify};
  align-self: ${({ align }) => align};
`;

const BoxElementsPlace = styled(BoxElementsDisplay)`
  padding: clamp(10px, 16px, 23px);
`;

const BoxElements = styled(BoxElementsPlace)`
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  box-sizing: border-box;
`;

const BoxPrice = styled(BoxElements)`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  margin-bottom: 20px;
`;

const TitlePrice = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.regular};
  color: ${({ theme }) => theme.colors.text.lightest};
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
  line-height: 20px;
  margin-top: 10px;
`;

TripServicePage.getInitialProps = async (ctx) => {
  const { tripId, serviceType } = ctx.query;

  const { query: apolloQuery } = await getAuthApolloClient(ctx);

  const {
    data: { getTrip: trip },
  }: { data: { getTrip: Trip } } = await apolloQuery({
    query: GET_TRIP,
    variables: {
      tripId,
    },
  });

  const {
    data: { getServiceByType: service },
  }: { data: { getServiceByType: Service } } = await apolloQuery({
    query: GET_SERVICE_BY_TYPE,
    variables: {
      serviceType,
      countryIso2: trip.city.country.iso2,
      checkInDate: trip.date.start,
      checkOutDate: trip.date.end,
    },
  });

  return {
    data: { trip, service: { ...service } },
  };
};

export default TripServicePage;
