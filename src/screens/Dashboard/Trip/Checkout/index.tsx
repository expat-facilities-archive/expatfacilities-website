import DashboardCheckoutTogglableForm from "@components/Checkout/TogglebleForm";
import DashboardProvider from "@components/Dashboard/Provider";
import {
  DashboardButton,
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldLabel,
  DashboardForm,
} from "@components/Layout/Dashboard";
import ROUTES from "@constants/routes";
import { useForm } from "@hooks/useForm";
import useTranslation from "@hooks/useTranslation";
import { getAuthApolloClient } from "@services/apollo/client";
import {
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { DashboardPage } from "@typeDefs/auth";
import { calculateWithoutCommission } from "@utils/calculateWithoutCommission";
import { formatAmount } from "@utils/formatAmount";
import { getNbDaysBetweenTwoDate } from "@utils/getNbDaysBetweenTwoDate";
import { NextPage } from "next";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";

import "react-credit-cards-2/dist/es/styles-compiled.css";
import CreditCardForm from "@components/Checkout/CreditCardForm";
import { Order } from "@typeDefs/order";
import {
  APPLY_PROMOCODE,
  GENERATE_ORDER,
  ORDER_CREATE_PAYMENTINTENT,
} from "@queries/order";
import { Trip, TripService } from "@typeDefs/destinations";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { calculateReduction } from "@utils/calculateReduction";

interface Props extends DashboardPage {
  generateOrder: Order;
}

const DashboardTripCheckoutPage: NextPage<Props> = ({
  currentUser,
  generateOrder,
}: Props) => {
  const router = useRouter();


  const [order] = React.useState<Order>(generateOrder);
  const [loading, setLoading] = React.useState<boolean>(false);

  const { t: tCommon } = useTranslation("dashboard/common");
  const { t: tOverview } = useTranslation("dashboard/overview");
  const { t: tService } = useTranslation("data/services");
  const { t: tCheckout } = useTranslation("dashboard/checkout");

  const stripe = useStripe();
  const elements = useElements();

  const trip: Trip = order.trip;

  const [promoCodeApplied] = useState<boolean>(false);

  const { values: paymentMethodValues, onChange: paymentMethodOnChange } =
    useForm(() => null, {
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      promoCode: order.promoCode ? order.promoCode.code : "",
    });

  const [orderCreatePaymentIntent] = useStaticMutation(ORDER_CREATE_PAYMENTINTENT);

  const [applyPromoCode] = useStaticMutation(APPLY_PROMOCODE);

  const handleApplyPromoCode = async () => {
    setLoading(true);
    try {
      const { data } = await applyPromoCode({
        variables: {
          orderId: order.id,
          promoCode: paymentMethodValues.promoCode,
        },
      });

      if (data) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }
    orderCreatePaymentIntent({
      variables: {
        orderId: order.id,
      },
    });
  };

  return (
    <DashboardProvider
      currentUser={currentUser}
      title={`${tOverview("sidebar.trips")} > ${trip.city.name} > ${tCheckout(
        "checkout-recap"
      )}`}
      buttons={
        <DashboardButton
          onClick={() => {
            router.push(`${ROUTES.DASHBOARD_TRIPS}/${trip.id}`);
          }}
          mode={"darker"}
        >
          {tCommon("buttons.back")}
        </DashboardButton>
      }
    >
      <Container>
        <CheckoutDetailsSection>
          <CheckoutForm>
            <CheckoutFormTitle>{tCheckout("payment-method")}</CheckoutFormTitle>
            <CreditCardForm onChange={paymentMethodOnChange} />
          </CheckoutForm>

          <DashboardCheckoutTogglableForm
            name={tCheckout("promo-code")}
            defaultToggled={paymentMethodValues.promoCode === ""}
            submitButtonName={"apply"}
            onSubmit={handleApplyPromoCode}
            loading={!stripe || !elements || loading}
          >
            {(toggled: boolean) => (
              <DashboardFieldContainer>
                {toggled ? (
                  <CheckoutField
                    type={"text"}
                    name={"promoCode"}
                    disabled={paymentMethodValues.promoCode && promoCodeApplied}
                    onChange={paymentMethodOnChange}
                    value={paymentMethodValues.promoCode}
                  />
                ) : (
                  <CheckoutField
                    type={"text"}
                    disabled={true}
                    placeholder={paymentMethodValues.promoCode}
                  />
                )}
              </DashboardFieldContainer>
            )}
          </DashboardCheckoutTogglableForm>
        </CheckoutDetailsSection>

        <PaymentSection>
          <PaymentForm>
            <Separator />
            <PriceContainer>
              <Price>
                {formatAmount(order.finalPrice)}{" "}
                <TextMini>
                  {tCheckout("forndays", [
                    getNbDaysBetweenTwoDate(
                      trip.date.start,
                      trip.date.end
                    ).toString(),
                  ])}
                </TextMini>
              </Price>
            </PriceContainer>
            <DashboardForm>
              <DashboardFieldContainer>
                <FlexContainer style={{ gap: "10px" }}>
                  <DateFormInput>
                    <DashboardFieldLabel>
                      {tCheckout("departure")}
                    </DashboardFieldLabel>
                    <CheckoutField
                      value={new Date(trip.date.start).toLocaleDateString()}
                      disabled
                    />
                  </DateFormInput>
                  <DateFormInput>
                    <DashboardFieldLabel>
                      {tCheckout("return")}
                    </DashboardFieldLabel>
                    <CheckoutField
                      value={new Date(trip.date.end).toLocaleDateString()}
                      disabled
                    />
                  </DateFormInput>
                </FlexContainer>
                <DashboardFieldLabel>{tCheckout("city")}</DashboardFieldLabel>
                <CheckoutField type="text" value={trip.city.name} disabled />
              </DashboardFieldContainer>
            </DashboardForm>
            <PayButton
              onClick={handlePayment}
              disabled={!stripe || !elements || loading}
            >
              {tCheckout("placeorder")}
            </PayButton>
            <TOSAcceptance
              dangerouslySetInnerHTML={{
                __html: tCheckout("tos-acceptance", [
                  `<a href="/terms" target="_blank">${tCheckout(
                    "conditions-of-selling"
                  )}</a>`,
                  `<a href="/terms" target="_blank">${tCheckout(
                    "conditions-of-uses"
                  )}</a>`,
                ]),
              }}
            />
            <Separator />
            <ServicesDetails>
              <ServiceList>
                {trip.services.map((service: TripService) => (
                  <InvoiceAmountRow key={service.id}>
                    <InvoiceRowName>
                      {tService(service.service.name)}
                    </InvoiceRowName>
                    <InvoiceRowPrice>
                      {formatAmount(service.totalPrice)}
                    </InvoiceRowPrice>
                  </InvoiceAmountRow>
                ))}
                {order.promoCode && (
                  <InvoiceAmountRow>
                    <InvoiceRowName>{`${tCheckout("promo-code")} "${
                      order.promoCode.code
                    }"`}</InvoiceRowName>
                    <InvoiceRowPrice>
                      {`-${formatAmount(
                        calculateReduction(
                          order.basePrice,
                          order.promoCode.discount
                        )
                      )}`}
                    </InvoiceRowPrice>
                  </InvoiceAmountRow>
                )}
              </ServiceList>
              <ServiceTotalAmount>
                <InvoiceRowName>{tCheckout("totalamount")}</InvoiceRowName>
                <InvoiceRowPrice>
                  {formatAmount(order.finalPrice)}
                </InvoiceRowPrice>
              </ServiceTotalAmount>
              <Vat>
                {tCheckout("withvat", [
                  formatAmount(calculateWithoutCommission(trip.totalPrice, 20)),
                ])}
              </Vat>
            </ServicesDetails>
          </PaymentForm>
        </PaymentSection>
      </Container>
    </DashboardProvider>
  );
};

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const DateFormInput = styled.div`
  flex: 1;

  input {
    width: calc(187px - 14px * 2 - 1px * 2);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
  margin-top: 30px;
  padding: 0 50px;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    flex-direction: column;
  }
`;

const CheckoutField = styled(DashboardField)`
  width: calc(384px - 14px * 2 - 1px * 2);
`;

const CheckoutDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 15px;
`;

const PaymentSection = styled.section`
  width: 384px;
  height: fit-content;
  padding: 25px 30px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  background-color: ${({ theme }) => theme.colors.layout.darker};

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    align-self: center;
  }
`;

const PaymentForm = styled.div``;

const CheckoutForm = styled.div`
  position: relative;
  padding: 25px 30px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  background-color: ${({ theme }) => theme.colors.layout.darker};
  transition: all 0.3s ease-in-out;
`;

const CheckoutFormTitle = styled.h4`
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.colors.text.lightest};
`;

const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text.dark};
`;

const PriceContainer = styled.div`
  margin-top: 25px;
`;

const Price = styled.h2`
  font-weight: ${({ theme }) => theme.weight.semiBold};
  font-size: ${({ theme }) => theme.size.medium};
`;

const TextMini = styled.span`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.regular};
  color: ${({ theme }) => theme.colors.layout.light};
`;

const InvoiceAmountRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PayButton = styled(DashboardButton)`
  width: 100%;
  margin-top: 20px;
`;

const TOSAcceptance = styled.p`
  margin: 20px 0;
  text-align: justify;
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.colors.text.light};
`;

const ServicesDetails = styled.div`
  margin-top: 10px;
`;

const ServiceList = styled.ul`
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size.normal};
`;

const InvoiceRowName = styled.div``;

const InvoiceRowPrice = styled.div``;

const ServiceTotalAmount = styled(InvoiceAmountRow)`
  margin-top: 20px;
  font-weight: ${({ theme }) => theme.weight.semiBold};
  font-size: ${({ theme }) => theme.size.medium};
`;

const Vat = styled.span`
  font-size: ${({ theme }) => theme.size.tiny};
  font-weight: ${({ theme }) => theme.weight.medium};
  color: ${({ theme }) => theme.colors.layout.light};
`;

DashboardTripCheckoutPage.getInitialProps = async (ctx) => {
  const { query, res } = ctx;
  const { tripId } = query;

  const { mutate: apolloMutate } = await getAuthApolloClient(ctx);

  const {
    data: { generateOrder: order },
  } = await apolloMutate({
    mutation: GENERATE_ORDER,
    variables: {
      tripId,
    },
  });

  if (order.finalPrice <= 0 || order.trip.state !== "completed") {
    const route = `${ROUTES.DASHBOARD_TRIPS}/${tripId}`;
    if (res) {
      res.writeHead(307, { Location: route });
      res.end();
    } else {
      router.push(route);
    }
  }

  return { generateOrder: order };
};

export default DashboardTripCheckoutPage;
