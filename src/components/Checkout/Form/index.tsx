import React, { useCallback, useState } from "react";

import { useStaticMutation } from "@hooks/useStaticQuery";
import { CREATE_PAYMENT_INTENT } from "@queries/checkout";
import { CardElement, useStripe } from "@stripe/react-stripe-js";
import { useForm } from "@hooks/useForm";
import {
  DashboardButton,
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardForm,
} from "@components/Layout/Dashboard";
import Loading from "@components/Layout/Loading";
import styled, { withTheme } from "styled-components";
import { formatAmount } from "@utils/formatAmount";
import { Error } from "@components/Auth/Form/Field";
import { MainTheme, Theme } from "@typeDefs/themes";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import { PromoCode } from "@typeDefs/promo-code";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { calculateReduction } from "@utils/calculateReduction";
import { GET_PROMOCODE_BY_CODE } from "@queries/promo-code";

type Props = {
  totalAmount: number;
  theme: Theme & MainTheme;
};

const CheckoutForm: React.FC<Props> = ({
  totalAmount,
  theme,
}: Props) => {
  const [isSubmitable, setSubmitable] = useState<boolean>(false);
  const [promoCodeLoading, setPromoCodeLoading] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState<PromoCode | null>(null);
  const [paymentLoading, setPayementLoading] = useState<boolean>(false);
  const [payment, setPayment] = useState({ status: "initial" });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [finalPrice, setFinalPrice] = useState<number>(totalAmount);

  const CARD_OPTIONS: StripeCardElementOptions = {
    iconStyle: "solid" as const,
    style: {
      base: {
        iconColor: theme.colors.text.light,
        color: theme.colors.text.lightest,
        fontWeight: theme.weight.regular,
        fontFamily: theme.family.primary,
        fontSize: theme.size.normal,
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: theme.colors.accent.light,
        },
        "::placeholder": {
          color: theme.colors.text.darker,
        },
      },
      invalid: {
        iconColor: theme.colors.text.light,
        color: theme.colors.accent.red,
      },
    },
    hidePostalCode: true,
  };

  const stripe = useStripe();

  const { values, onChange } = useForm(() => null, {
    email: "",
    cardholderName: "",
    address: "",
    promoCode: "",
    phone: "",
  });

  const applyPromoCode = useCallback(async () => {
    setPromoCodeLoading(true);

    const fetchData = async () => {
      const { query: apolloQuery } = await getStandaloneApolloClient();

      const response: { data: { getPromoCodeByCode: PromoCode } } =
        await apolloQuery({
          query: GET_PROMOCODE_BY_CODE,
          variables: {
            code: values.promoCode,
          },
        });

      return response;
    };

    fetchData()
      .then(({ data: { getPromoCodeByCode: promoCode } }) => {
        if (!promoCode.active) {
          setErrorMessage("Promo code is not active");
          return;
        }

        setPromoCode(promoCode);
        values.promoCode = "";
        setFinalPrice(
          finalPrice - calculateReduction(totalAmount, promoCode.discount)
        );
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Code promotionel invalide");
      })
      .finally(() => {
        setPromoCodeLoading(false);
      });
  }, [finalPrice, totalAmount, values]);


  const [createPaymentIntent] = useStaticMutation(CREATE_PAYMENT_INTENT);

  const handlePaymentSubmit = useCallback(async () => {
    setErrorMessage("");
    setPayementLoading(true);
    setPayment({ status: "processing" });

    await createPaymentIntent({
      variables: {
        totalAmount: finalPrice,
        currency: "eur",
      }
    });
  }, [createPaymentIntent]);

  return (
    <CheckoutFormContainer>
      <CheckoutFormElement>
        <CheckoutFormGroup>
          <PaymentFieldGroup>
            <CheckoutFieldLabel>Nom</CheckoutFieldLabel>
            <PaymentFieldContainer>
              <CheckoutField
                type={"text"}
                id={"name"}
                name={"name"}
                onChange={onChange}
                value={values.name}
                required
              />
            </PaymentFieldContainer>
          </PaymentFieldGroup>
          <PaymentFieldGroup>
            <CheckoutFieldLabel>Carte bancaire</CheckoutFieldLabel>
            <CardField
              onChange={(e) => {
                if (e.complete) {
                  setSubmitable(true);
                }
              }}
              options={CARD_OPTIONS}
            />
          </PaymentFieldGroup>
        </CheckoutFormGroup>

        <PaymentFieldGroup>
          <CheckoutFieldLabel>Code Promotionel (optionel)</CheckoutFieldLabel>
          <PaymentFieldContainer>
            <CheckoutField
              type={"text"}
              id={"promoCode"}
              name={"promoCode"}
              placeholder={promoCode && promoCode.code}
              disabled={promoCode}
              group={{
                right: [
                  <PromoCodeApplyButton
                    key={"apply"}
                    onClick={applyPromoCode}
                    disabled={!values.promoCode || promoCodeLoading}
                  >
                    {promoCodeLoading && <PaymentLoading color={"#fff"} />}
                    {"Appliquer"}
                  </PromoCodeApplyButton>,
                ],
              }}
              onChange={onChange}
              value={values.promoCode}
            />
          </PaymentFieldContainer>
        </PaymentFieldGroup>

        {errorMessage && <PaymentError>{errorMessage}</PaymentError>}
        <PaymentButton
          type={"submit"}
          disabled={!stripe || paymentLoading || !isSubmitable}
          onClick={handlePaymentSubmit}
        >
          {paymentLoading && <PaymentLoading color={"#fff"} />} Pay{" "}
          {formatAmount(finalPrice)}
        </PaymentButton>
        <PaymentStatus status={payment.status}>{payment.status}</PaymentStatus>
      </CheckoutFormElement>
    </CheckoutFormContainer>
  );
};

const CheckoutFormContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

const CheckoutFormElement = styled(DashboardForm)`
  margin: 0;
  width: 400px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

const CheckoutFormGroup = styled.div`
  width: 100%;
`;

const PaymentFieldGroup = styled(DashboardFieldGroup)`
  flex-direction: column;
  padding: 8px 0 8px 0;
  margin: 0;
`;

const CheckoutFieldLabel = styled(DashboardFieldLabel)`
  width: 100%;
  margin-bottom: 5px;
`;

const CheckoutField = styled(DashboardField)`
  text-align: left;
  width: 100%;
  height: 30px;
`;

const CardField = styled(CardElement)`
  border-radius: 4px;
  padding: 10px 12px;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
    color: ${({ theme }) => theme.colors.text.lightest};
  }
`;

const PaymentFieldContainer = styled(DashboardFieldContainer)`
  ${Error} {
    margin-left: 0;
  }
`;

const PaymentError = styled.p`
  color: ${({ theme }) => theme.colors.accent.red};
`;

const PaymentButton = styled(DashboardButton)`
  margin-top: 20px;
  width: 200px;
  height: 40px;
  width: 100%;
`;

const PaymentLoading = styled(Loading)`
  margin-right: 10px;
  height: 17px;
  width: 17px;
`;

const PaymentStatus = styled.p<{ status: string }>`
  display: none;
  ${({ status, theme }) =>
    (status === "succeeded" || status === "requires_action") &&
    `
      display: block;
      color: ${() => {
        switch (status) {
          case "succeeded":
            return theme.colors.accent.green;
          default:
            return theme.colors.text.light;
        }
      }};
    `}
`;

const PromoCodeApplyButton = styled(DashboardButton)`
  margin-top: 0;
`;

export default withTheme(CheckoutForm);
