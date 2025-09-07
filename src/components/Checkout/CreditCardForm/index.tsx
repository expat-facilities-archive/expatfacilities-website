import React, {
  useState,
  FocusEvent,
  ClipboardEvent,
  ChangeEvent,
  useRef,
} from "react";

import Cards, { Focused } from "react-credit-cards-2";
import {
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardFieldContainer,
  DashboardField,
} from "@components/Layout/Dashboard";
import useTranslation from "@hooks/useTranslation";
import styled, { useTheme } from "styled-components";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  cardPreview?: boolean;
}

const CreditCardForm: React.FC<Props> = ({
  onChange,
  cardPreview = false,
}: Props) => {
  const { t: tCheckout } = useTranslation("dashboard/checkout");
  const theme = useTheme();

  const CARD_OPTIONS = {
    style: {
      base: {
        iconColor: theme.colors.text.lightest,
        color: theme.colors.text.lightest,
        fontWeight: theme.weight.medium,
        fontFamily: theme.family.primary,
        fontSize: theme.size.normal,
        fontSmoothing: "antialiased",
        "::placeholder": {
          color: theme.colors.text.light,
        },
      },
    },
  };

  const numberRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const [values, setValues] = useState<{
    number: string;
    name: string;
    expiry: string;
    cvc: string;
  }>({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [focus, setFocus] = useState<Focused | undefined>(undefined);
  const [, setValid] = useState<boolean>(true);

  const handleFocus = (focusOn: Focused | undefined) => {
    setFocus(focusOn);

    if (focusOn === "number" && numberRef.current) {
      console.log(numberRef);
      numberRef.current.focus();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.currentTarget;

    if (name === "name") {
      const formattedValue: string = value
        .replace(/[}"`~_=.\->\]|<?+*/,\d;\\[:{\\!@#\\/'$%^&*()]/g, "")
        .toUpperCase();

      setValues({ ...values, [name]: formattedValue });
    }

    onChange(event);
  };

  return (
    <Container>
      {cardPreview && (
        <Cards
          locale={{ valid: tCheckout("card-expires-at") }}
          placeholders={{ name: tCheckout("card-holder-name") }}
          acceptedCards={["visa", "mastercard"]}
          number={values.number}
          name={values.name}
          expiry={values.expiry}
          cvc={values.cvc}
          focused={focus}
          callback={(type: any, isValid: boolean) => {
            setValid(type.issuer !== "unknown" && isValid);
          }}
        />
      )}

      <CreditCardFieldGroup>
        <DashboardFieldLabel>{tCheckout("card-number")}</DashboardFieldLabel>
        <DashboardFieldContainer>
          <CardField ref={numberRef}>
            <CardNumberElement
              options={CARD_OPTIONS}
              onFocus={() => handleFocus("number")}
              onBlur={() => handleFocus(undefined)}
            />
          </CardField>
        </DashboardFieldContainer>
      </CreditCardFieldGroup>

      <CreditCardFieldGroup>
        <DashboardFieldLabel>
          {tCheckout("cardholder-name")}
        </DashboardFieldLabel>
        <DashboardFieldContainer>
          <CreditCardField
            id={"2"}
            name={"name"}
            type={"text"}
            ref={nameRef}
            spellCheck={false}
            value={values.name}
            maxLength={20}
            autoComplete={"off"}
            onPaste={(event: ClipboardEvent<HTMLInputElement>) =>
              event.preventDefault()
            }
            onChange={handleChange}
            onFocus={(event: FocusEvent<HTMLInputElement>) => {
              event.preventDefault();

              handleFocus("name");
            }}
            required={true}
          />
        </DashboardFieldContainer>
      </CreditCardFieldGroup>

      <CreditCardFieldGroup>
        <CombinedFieldContainer>
          <CombinedField>
            <DashboardFieldLabel>
              {tCheckout("expiry-date")}
            </DashboardFieldLabel>
            <DashboardFieldContainer>
              <CardField>
                <CardExpiryElement
                  options={CARD_OPTIONS}
                  onFocus={() => handleFocus("expiry")}
                  onBlur={() => handleFocus(undefined)}
                />
              </CardField>
            </DashboardFieldContainer>
          </CombinedField>

          <CombinedField>
            <DashboardFieldLabel>{tCheckout("cvc")}</DashboardFieldLabel>
            <DashboardFieldContainer>
              <CardField>
                <CardCvcElement
                  options={CARD_OPTIONS}
                  onFocus={() => handleFocus("cvc")}
                  onBlur={() => handleFocus(undefined)}
                />
              </CardField>
            </DashboardFieldContainer>
          </CombinedField>
        </CombinedFieldContainer>
      </CreditCardFieldGroup>
    </Container>
  );
};

const Container = styled.div`
  max-width: 425px;
`;

const CreditCardFieldGroup = styled(DashboardFieldGroup)`
  padding: 0;
  margin-top: 10px;

  &:first-child {
    margin-top: 0;
  }
`;

const CombinedFieldContainer = styled(DashboardFieldContainer)`
  flex-direction: row;
  justify-content: space-between;
`;

const CombinedField = styled.div`
  flex: 1;
  margin-left: 10px;

  &:first-child {
    margin-left: 0;
  }
`;

const CardField = styled.div`
  padding: 10px 14px;
  color: ${({ theme }) => theme.colors.text.lightest};
  background-color: ${({ theme }) => theme.colors.layout.darker};
  transition: all 0.2s;
  border: 1px solid ${({ theme }) => theme.colors.layout.dark};
  outline: none;
  border-radius: 5px;
  text-align: left;

  :focus {
    border: 1px solid ${({ theme }) => theme.colors.accent.red};
  }
`;

const CreditCardField = styled(DashboardField)<{ valid?: boolean }>`
  width: auto;

  // - removes number input's arrows
  -webkit-appearance: none;
  margin: 0;
  -moz-appearance: textfield;

  ${({ valid = true, theme }) =>
    !valid &&
    `color: ${theme.colors.accent.red}; border-color: ${theme.colors.accent.red};`}
`;

export default CreditCardForm;
