import { NextPage } from "next";
import React from "react";
import { DashboardPage } from "@typeDefs/auth";
import { GET_USER } from "@queries/users";
import { getAuthApolloClient } from "@services/apollo/client";
import DashboardProvider from "@components/Dashboard/Provider";
import { DashboardButton, DashboardSelect } from "@components/Layout/Dashboard";
import { User } from "@typeDefs/user";
import router from "next/router";
import ROUTES from "@constants/routes";
import styled from "styled-components";
import ProgressBar from "@components/Dashboard/ProgressBar";
import ListItem from "@components/Dashboard/ListItem";
import DocDisplay from "@components/Dashboard/DocDisplay";
import TripComment from "@components/Dashboard/TripComment";
import useTranslation from "@hooks/useTranslation";
import Icon from "@components/Layout/Icon";
import useBreakpoint from "@hooks/useBreakpoint";

interface Props extends DashboardPage {
  data: { getUser: User };
}

const DashboardUserProfileService: NextPage<Props> = ({
  data: { getUser: user },
  currentUser,
}: Props) => {
  const breakPoint = useBreakpoint();

  const { t: tCommon } = useTranslation("dashboard/common");
  // const { t: tData } = useTranslation("data/services");
  const { t } = useTranslation("dashboard/trip");

  const listStatus = [
    "Création du service",
    "Attestation envoyée",
    "Réception confirmée",
    "Confirmation",
    "Terminé",
  ];
  return (
    <DashboardProvider
      title={`${tCommon("user")} > ${user.firstName} ${
        user.lastName
      } > tripCity > service type`}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              // TODO make a variable if admin or client and fix with new request user(id)/ ${trip.id}
              router.push(`${ROUTES.DASHBOARD_ADMIN_USERS}/${user.id}`);
            }}
            mode={"darker"}
            prefix={<Icon name={"arrow-drop-left"} />}
            // responsive={breakPoint.isTablet}
          >
            {!breakPoint.isTablet && tCommon("buttons.back")}
          </DashboardButton>
        </>
      }
    >
      <DisplayServiceMain column={4}>
        <BoxElements gridArea={"banner"}>
          <ProgressBar
            name={<TitleBox>{tCommon("tracking")}</TitleBox>}
            // TODO Step title bassed on status list from this services
            steps={[
              {
                id: 1,
                title: "Création du service",
                percent: 5,
                content: "22 avril 2022",
              },
              {
                id: 2,
                title: "Attestation envoyée",
                percent: 30,
                content: "28 avril 2022",
              },
              {
                id: 3,
                title: "Réception confirmée",
                percent: 55,
                content: "5 mai 2022",
              },
              {
                id: 4,
                title: "Confirmation",
                percent: 65,
                content: "",
              },
              { id: 5, title: "Terminé", percent: 100, content: "Terminé" },
            ]}
            progress={55}
          ></ProgressBar>
        </BoxElements>
        <DisplayAdmin column={2} gridArea={"admin"}>
          <BoxElements gridArea={"status"}>
            <TitleBox>{t("overview.services.servicestatus")}</TitleBox>
            <DashboardSelect
              name="statusOfService"
              // onChange={onChange}
              defaultValue={""}
              required
            >
              <option value="" hidden disabled>
                {tCommon("chooseoption")}
              </option>
              {listStatus.map((status): any => (
                <option key={status.length} value={status}>
                  {status}
                </option>
              ))}
            </DashboardSelect>
          </BoxElements>
          <BoxElements gridArea={"comment"}>
            <TripComment
              title={
                <TitleBox>
                  {tCommon("comment")}
                  <TitleSpan>({tCommon("optional")})</TitleSpan>
                </TitleBox>
              }
              comment={""}
            />
          </BoxElements>
          <BoxElements gridArea={"commentUser"}>
            <TripComment
              title={
                <TitleBox>
                  {`${tCommon("commentof")} ${user.firstName} ${user.lastName}`}
                </TitleBox>
              }
              comment={"user comment read only"}
              disabled
            />
          </BoxElements>
          <BoxElementsFlex gridArea={"doc"}>
            <DocDisplay
              title={t("overview.services.documenttobeprovide")}
              docs={[
                {
                  id: "1",
                  content: "passport",
                  url: "https://picsum.photos/200/300",
                },
                { id: "2", content: "visa" },
                { id: "3", content: "permis" },
              ]}
              margin={"1rem"}
              largeDisplay={true}
            />
          </BoxElementsFlex>
        </DisplayAdmin>
        <DisplayServiceFlex gridArea={"review"}>
          <BoxPrice>
            <TitlePrice>{tCommon("price")}</TitlePrice>
            <Price>345.43€</Price>
          </BoxPrice>
          <BoxElements>
            <ListItem
              title={`${t("overview.services.finishtheconfiguation")}
              Logement
              :`}
              list={[
                {
                  id: "1",
                  content: "Budget à définir",
                },
                {
                  id: "2",
                  content: "Pièce d’identité à fournir",
                },
                { id: "3", content: "Passeport à fournir" },
                { id: "4", content: "VISA à fournir" },
              ]}
            ></ListItem>
          </BoxElements>
        </DisplayServiceFlex>
        <BoxBtnFixe gridArea={"save"}>
          <DashboardButton
            onClick={() => {
              router.push("#");
            }}
          >
            <Icon name={"save"} fill />
            {tCommon("buttons.save")}
          </DashboardButton>
        </BoxBtnFixe>
      </DisplayServiceMain>
    </DashboardProvider>
  );
};

DashboardUserProfileService.getInitialProps = async (ctx) => {
  const { userId } = ctx.query;

  const { query: apolloQuery } = await getAuthApolloClient(ctx);
  const { data: user }: { data: { getUser: any } } = await apolloQuery({
    query: GET_USER,
    variables: {
      id: userId,
    },
  });

  return { data: { ...user } };
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
  gap: 20px;
  height: calc(100% - 15px);
  grid-area: ${({ gridArea }) => gridArea};
`;

const DisplayServiceMain = styled(DisplayService)`
  padding: 15px;
  grid-template-areas:
    "banner banner banner banner"
    "admin admin admin review"
    "admin admin admin review"
    "admin admin admin save";
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-areas:
      "banner banner banner banner"
      "review review review review"
      "admin admin admin admin"
      "admin admin admin admin"
      "save save save save";
  }
`;

const DisplayAdmin = styled(DisplayService)`
  grid-template-areas:
    "status commentUser"
    "comment comment"
    "doc doc";
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    grid-template-areas:
      "status status"
      "commentUser commentUser"
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
  padding: 23px 26px;
`;

const BoxElementsFlex = styled(BoxElementsDisplay)`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
`;

const BoxElements = styled(BoxElementsPlace)`
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
`;

const BoxPrice = styled(BoxElements)`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  gap: 10px;
`;

const TitleBox = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.regular};
  line-height: 30px;
`;

const TitleSpan = styled.span`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  font-style: italic;
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
`;

const BoxBtnFixe = styled.div<{ gridArea?: string }>`
  position: sticky;
  bottom: 15px;
  align-self: end;
  grid-area: ${({ gridArea }) => gridArea};
`;

export default DashboardUserProfileService;
