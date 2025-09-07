import styled from "styled-components";

import {
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldLabel,
  DashboardForm,
  DashboardFormSubmitButton,
  DashboardButton,
  DashboardSection,
} from "@components/Layout/Dashboard";
import { NextPage } from "next";
import ROUTES from "@constants/routes";
import DashboardProvider from "@components/Dashboard/Provider";
import { useForm } from "@hooks/useForm";
import { useMutation } from "@apollo/react-hooks";
import router from "next/router";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { DashboardPage } from "@typeDefs/auth";
import { PromoCode } from "@typeDefs/promo-code";
import {
  DELETE_PROMOCODE,
  GET_PROMOCODE,
  UPDATE_PROMOCODE,
} from "@queries/promo-code";
import { formatDate } from "@utils/formatDate";
import Icon from "@components/Layout/Icon";
import Checkbox from "@components/Layout/Checkbox";

interface Props extends DashboardPage {
  promoCode: PromoCode;
}

const DashboardPromoCodeEdit: NextPage<Props> = ({
  currentUser,
  promoCode,
}: Props) => {
  const { values, onChange, onSubmit } = useForm(() => updatePromoCode(), {
    code: promoCode.code,
    discount: promoCode.discount,
    active: promoCode.active,
    expirationDate: formatDate(promoCode.expirationDate),
  });

  const [updatePromoCode] = useMutation(UPDATE_PROMOCODE, {
    variables: {
      id: promoCode.id,
      promoCodeInput: {
        ...values,
        discount: parseFloat(values.discount),
      },
    },
    update() {
      router.push(ROUTES.DASHBOARD_ADMIN_PROMOCODES);
    },
  });

  const [deletePromoCode] = useMutation(DELETE_PROMOCODE, {
    variables: {
      promoCodeId: promoCode.id,
    },
    update() {
      router.push(ROUTES.DASHBOARD_ADMIN_PROMOCODES);
    },
  });

  return (
    <DashboardProvider
      title={`Promo Codes > ${promoCode.code}`}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              deletePromoCode();
            }}
            mode={"red"}
            prefix={<Icon name={"delete-bin"} fill />}
          >
            Delete
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_ADMIN_PROMOCODES);
            }}
            mode={"darker"}
            prefix={<Icon name={"arrow-drop-left"} />}
          >
            Back
          </DashboardButton>
        </>
      }
    >
      <DashboardSection>
        <Container>
          <SectionTitle>{"Edit a promo code"}</SectionTitle>
          <FormPromoCode onSubmit={onSubmit}>
            <FieldGroup>
              <FieldLabel>Promo Code</FieldLabel>
              <DashboardFieldContainer>
                <Field
                  type="number"
                  name="discount"
                  value={values.discount}
                  onChange={onChange}
                />
              </DashboardFieldContainer>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Discount (in %)</FieldLabel>
              <DashboardFieldContainer>
                <Field
                  type="number"
                  name="discount"
                  value={values.discount}
                  onChange={onChange}
                />
              </DashboardFieldContainer>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Expiration Date</FieldLabel>
              <DashboardFieldContainer>
                <Field
                  type="date"
                  name="expirationDate"
                  placeholder="Expiration Date"
                  value={values.expirationDate}
                  onChange={onChange}
                />
              </DashboardFieldContainer>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Active</FieldLabel>
              <FieldContainer>
                <Checkbox
                  name={"active"}
                  defaultChecked={values.active}
                  value={values.active}
                  onChange={onChange}
                />
                <FormSubmitButton
                  type="submit"
                  disabled={
                    !values.code ||
                    !values.discount ||
                    values.discount <= 0 ||
                    !values.expirationDate
                  }
                  prefix={<Icon name={"add"} fill />}
                >
                  Update Promo Code
                </FormSubmitButton>
              </FieldContainer>
            </FieldGroup>
          </FormPromoCode>
        </Container>
      </DashboardSection>
    </DashboardProvider>
  );
};

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
`;

const FieldGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const FormSubmitButton = styled(DashboardFormSubmitButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border-radius: 10px;
`;

const SectionTitle = styled.p`
  font-weight: ${({ theme }) => theme.weight.regular};
  font-size: ${({ theme }) => theme.size.medium};
`;

const FieldLabel = styled(DashboardFieldLabel)`
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Field = styled(DashboardField)`
  text-align: left;
  margin-right: auto;
  padding: 15px;
`;
const FormPromoCode = styled(DashboardForm)`
  align-items: flex-start;
  gap: 10px;
`;
const Container = styled.div`
  box-sizing: border-box;
  width: min(820px, 100%);
  padding: 26px;
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
`;

DashboardPromoCodeEdit.getInitialProps = async ({ query }) => {
  const { promoCodeId } = query;
  const { query: apolloQuery } = await getStandaloneApolloClient();

  const {
    data: { getPromoCode: promoCode },
  }: { data: { getPromoCode: PromoCode } } = await apolloQuery({
    query: GET_PROMOCODE,
    variables: {
      promoCodeId,
    },
  });

  return {
    promoCode,
  };
};

export default DashboardPromoCodeEdit;
