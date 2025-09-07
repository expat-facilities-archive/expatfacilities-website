import React from "react";

import ROUTES from "@constants/routes";
import { GET_ORDER_BY_TRIP_ID } from "@queries/order";
import { getAuthApolloClient } from "@services/apollo/client";
import { Order } from "@typeDefs/order";
import { NextPage } from "next";
import router from "next/router";
import { DashboardPage } from "@typeDefs/auth";
import styled from "styled-components";
import DashboardProvider from "@components/Dashboard/Provider";
import useTranslation from "@hooks/useTranslation";
import { DashboardButton } from "@components/Layout/Dashboard";
import { formatAmount } from "@utils/formatAmount";

interface Props extends DashboardPage {
  order: Order;
}

const DashboardTripCheckoutSuccessPage: NextPage<Props> = ({
  currentUser,
  order,
}: Props) => {
  const { t: tCheckout } = useTranslation("dashboard/checkout");

  return (
    <DashboardProvider
      currentUser={currentUser}
      title={tCheckout("paymentsuccess-pagetitle")}
      buttons={
        <DashboardButton
          onClick={() => {
            router.push(`${ROUTES.DASHBOARD_TRIPS}/${order.trip.id}`);
          }}
        >
          {tCheckout("paymentsuccess-backbutton")}
        </DashboardButton>
      }
    >
      <Container>
        <Icon
          src="/static/images/dashboard/payment-success.svg"
          alt={tCheckout("paymentsuccess-title")}
        />
        <Title>{tCheckout("paymentsuccess-title")}</Title>
        <Subtitle>{tCheckout("paymentsuccess-subtitle")}</Subtitle>

        <CheckoutRecap>
          <RecapTitle>{tCheckout("paymentsuccess-recaptitle")}</RecapTitle>
          <RecapRow>
            {tCheckout("paymentsuccess-recapprice")}
            <Strong>{formatAmount(order.finalPrice)}</Strong>
          </RecapRow>
          <RecapRow>
            {tCheckout("paymentsuccess-destination")}
            <Strong>{order.trip.city.name}</Strong>
          </RecapRow>
          <RecapRow>
            {tCheckout("paymentsuccess-invoicenumber")}
            <Strong>{order.id.toUpperCase()}</Strong>
          </RecapRow>
          <RecapRow>
            {tCheckout("paymentsuccess-date")}
            <Strong>{new Date(order.createdAt).toLocaleDateString()}</Strong>
          </RecapRow>
          <RecapFooter>{tCheckout("paymentsuccess-footer")}</RecapFooter>
        </CheckoutRecap>
      </Container>
    </DashboardProvider>
  );
};

const Container = styled.main`
  display: flex;
  height: 100%;
  padding: 0 50px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  width: 400px;
  height: auto;

  fill: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.layout.darker};
`;

const Title = styled.h2`
  margin-top: 50px;
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.colors.text.lightest};
`;

const Subtitle = styled.p`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.medium};
  text-align: center;
  max-width: 950px;
  color: ${({ theme }) => theme.colors.text.lightest};
`;

const CheckoutRecap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  padding: 25px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border: 1px solid ${({ theme }) => theme.colors.layout.dark};
  border-radius: 10px;
`;

const RecapTitle = styled.p`
  text-decoration: underline;
`;

const RecapRow = styled.p``;

const RecapFooter = styled.footer`
  margin-top: 15px;
  font-style: italic;
`;

const Strong = styled.span`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

DashboardTripCheckoutSuccessPage.getInitialProps = async (ctx) => {
  const { query, res } = ctx;
  const { tripId } = query;

  const { query: apolloQuery } = await getAuthApolloClient(ctx);

  const {
    data: { getOrderByTripId: order },
  } = await apolloQuery({
    query: GET_ORDER_BY_TRIP_ID,
    variables: {
      tripId,
    },
  });

  console.log(order.trip);

  if (!order || order.status !== "completed") {
    const route = `${ROUTES.DASHBOARD_TRIPS}/${tripId}`;
    if (res) {
      res.writeHead(307, { Location: route });
      res.end();
    } else {
      router.push(route);
    }
  }

  return { order };
};

export default DashboardTripCheckoutSuccessPage;
