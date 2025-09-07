import styled from "styled-components";

import { NextPage } from "next";
import { DashboardPage } from "@typeDefs/auth";
import { GET_USER } from "@queries/users";
import { getAuthApolloClient } from "@services/apollo/client";
import DashboardProvider from "@components/Dashboard/Provider";
import { User } from "@typeDefs/user";
import Icon from "@components/Layout/Icon";

import {
  DashboardField,
  DashboardFieldContainer,
  DashboardFieldGroup,
  DashboardFieldLabel,
  DashboardSection,
} from "@components/Layout/Dashboard";
import { DashboardSectionTitle } from "@components/Layout/Dashboard";
import { DashboardForm } from "@components/Layout/Dashboard";

import { DashboardButton } from "@components/Layout/Dashboard";

import Button from "@components/Layout/Button";
import router from "next/router";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import useBreakpoint from "@hooks/useBreakpoint";

interface Props extends DashboardPage {
  data: { getUser: User };
}

const UsersDetailsEdit: NextPage<Props> = ({
  currentUser,
  data: { getUser: user },
}: Props) => {
  const breakPoint = useBreakpoint();

  const { t: tCommon } = useTranslation("dashboard/common");

  return (
    <DashboardProvider
      title={`Users > ${user.firstName} ${user.lastName}`}
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
            prefix={<Icon name={"save"} fill />}
            // responsive={breakPoint.isTablet}
          >
            {!breakPoint.isTablet && tCommon("buttons.save")}
          </DashboardButton>
        </>
      }
    >
      <DashboardSection>
        <Container>
          <Profile>
            <Section>
              <ProfileImg>
                <Img src={user.imageUrl}></Img>
              </ProfileImg>
            </Section>
            <Section>
              <ProfileUsername>{`${user.firstName} ${user.lastName}`}</ProfileUsername>
              <ProfileEmail> {`${user.email}`}</ProfileEmail>
              <Button prefix={<Icon name={"close"} fill />}>Supprimer</Button>
            </Section>
          </Profile>

          <SectionTitle>{"informations personelles"}</SectionTitle>

          <Form>
            <FieldGroup>
              <FieldLabel>Email</FieldLabel>
              <DashboardFieldContainer>
                <Field type="text" name="discount" value={user.email} />
              </DashboardFieldContainer>
            </FieldGroup>
            <FieldGroupWrapper>
              <FieldGroup>
                <FieldLabel>Nom</FieldLabel>
                <DashboardFieldContainer>
                  <Field type="text" name="discount" value={user.lastName} />
                </DashboardFieldContainer>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>Prenom</FieldLabel>
                <DashboardFieldContainer>
                  <Field type="text" name="discount" value={user.firstName} />
                </DashboardFieldContainer>
              </FieldGroup>
            </FieldGroupWrapper>

            <FieldGroupWrapper>
              <FieldGroup>
                <FieldLabel>{"Numéro d'adresse"}</FieldLabel>
                <DashboardFieldContainer>
                  <Field
                    type="text"
                    name="discount"
                    value={user.billingAddress}
                  />
                </DashboardFieldContainer>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>{"Nom d'adresse"}</FieldLabel>
                <DashboardFieldContainer>
                  <Field type="text" name="discount" />
                </DashboardFieldContainer>
              </FieldGroup>
            </FieldGroupWrapper>

            <FieldGroupWrapper>
              <FieldGroup>
                <FieldLabel>{"Zip Code"}</FieldLabel>
                <DashboardFieldContainer>
                  <Field type="text" name="discount" />
                </DashboardFieldContainer>
              </FieldGroup>
              <FieldGroup>
                <FieldLabel>{"Ville"}</FieldLabel>
                <DashboardFieldContainer>
                  <Field type="text" name="discount" />
                </DashboardFieldContainer>
              </FieldGroup>
            </FieldGroupWrapper>
          </Form>
        </Container>
      </DashboardSection>
    </DashboardProvider>
  );
};

const FieldLabel = styled(DashboardFieldLabel)`
  display: block;
`;

const SectionTitle = styled(DashboardSectionTitle)`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
  line-height: 30px;
`;

const FieldGroupWrapper = styled.div`
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  padding: 20px 15px;
  max-width: 790px;
  border-radius: 5px;
  min-height: 625px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
`;

const FieldGroup = styled(DashboardFieldGroup)`
  margin: 0;
  display: block;
`;

const Field = styled(DashboardField)`
  padding: 15px;
  border-radius: 5px;
`;

const Form = styled(DashboardForm)``;

const ProfileImg = styled.div`
  width: 121px;
  height: 121px;
  border-radius: 15px;
  background-color: lightgray;
`;
const Img = styled.img``;

const ProfileUsername = styled.h3`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.semiBold};
  line-height: 22.5px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  :last-of-type {
    > * {
      display: flex;
      gap: 4px;
      line-height: 22.5px;
      font-size: ${({ theme }) => theme.size.normal};
    }
  }
`;

const ProfileEmail = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  margin-bottom: 12px;
`;

const Profile = styled.div`
  padding: 15px 30px 15px 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.text.light};
  display: flex;
  gap: 28px;
`;

UsersDetailsEdit.getInitialProps = async (ctx) => {
  const { userId } = ctx.query;

  const { query: apolloQuery } = await getAuthApolloClient(ctx);
  const { data: user }: { data: { getUser: User } } = await apolloQuery({
    query: GET_USER,
    variables: {
      id: userId,
    },
  });

  return { data: { ...user } };
};

export default UsersDetailsEdit;
