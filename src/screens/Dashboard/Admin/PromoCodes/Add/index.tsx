import {
  DashboardField,
  DashboardFieldLabel,
  DashboardForm,
  DashboardFormSubmitButton,
  DashboardButton,
  DashboardSection,
  DashboardSectionTitle,
} from "@components/Layout/Dashboard";
import { NextPage } from "next";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";
import DashboardProvider from "@components/Dashboard/Provider";
import { useForm } from "@hooks/useForm";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { DashboardPage } from "@typeDefs/auth";
import { CREATE_PROMOCODE } from "@queries/promo-code";
import { formatDate } from "@utils/formatDate";
import styled from "styled-components";
import Icon from "@components/Layout/Icon";
import Checkbox from "@components/Layout/Checkbox";

type Props = DashboardPage;

const DashboardPromoCodesAdd: NextPage<Props> = ({ currentUser }: Props) => {
  const router = useRouter();

  const createPromoCodeCallback = async () => {
    createPromoCode({
      variables: {
        promoCodeInput: {
          ...values,
          discount: parseFloat(values.discount),
        },
      }
    });
  };

  const expirationDatePrevision = new Date();
  expirationDatePrevision.setDate(expirationDatePrevision.getDate() + 7);

  const { values, onChange, onSubmit } = useForm(createPromoCodeCallback, {
    code: "",
    active: true,
    discount: 0,
    expirationDate: formatDate(expirationDatePrevision),
  });

  const [createPromoCode] = useStaticMutation(CREATE_PROMOCODE);

  return (
    <DashboardProvider
      title={"Promo Codes > Add"}
      currentUser={currentUser}
      buttons={
        <DashboardButton
          onClick={() => {
            router.push(ROUTES.DASHBOARD_ADMIN_PROMOCODES);
          }}
          mode={"darker"}
          prefix={<Icon name={"arrow-drop-left"} />}
        >
          Back
        </DashboardButton>
      }
    >
      <DashboardSection>
        <Container>
          <SectionTitle>{"Add a promo code"}</SectionTitle>
          <FormPromoCode onSubmit={onSubmit}>
            <FieldGroup>
              <FieldLabel>Promo Code</FieldLabel>
              <FieldContainer>
                <Field
                  type="text"
                  name="code"
                  placeholder="Code"
                  value={values.code}
                  onChange={onChange}
                />
              </FieldContainer>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Discount (in %)</FieldLabel>
              <FieldContainer>
                <Field
                  type="number"
                  name="discount"
                  value={values.discount}
                  onChange={onChange}
                />
              </FieldContainer>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Expiration Date</FieldLabel>
              <FieldContainer>
                <Field
                  type="date"
                  name="expirationDate"
                  placeholder="Expiration Date"
                  defaultValue={expirationDatePrevision}
                  value={values.expirationDate}
                  onChange={onChange}
                />
              </FieldContainer>
            </FieldGroup>
            <FieldGroup>
              <FieldLabel>Active on creation</FieldLabel>
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
                  Add promo code
                </FormSubmitButton>
              </FieldContainer>
            </FieldGroup>
          </FormPromoCode>
        </Container>
      </DashboardSection>
    </DashboardProvider>
  );
};

const FieldGroup = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

const Field = styled(DashboardField)`
  padding: 15px;
  text-align: left;
  margin-right: auto;
`;

const FieldContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const SectionTitle = styled(DashboardSectionTitle)`
  font-weight: ${({ theme }) => theme.weight.regular};
  font-size: ${({ theme }) => theme.size.medium};
`;

const FieldLabel = styled(DashboardFieldLabel)`
  white-space: nowrap;
  font-weight: ${({ theme }) => theme.weight.bold};
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

const FormPromoCode = styled(DashboardForm)`
  align-items: flex-start;
  gap: 10px;
`;

export default DashboardPromoCodesAdd;
