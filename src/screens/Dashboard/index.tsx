import { NextPage } from "next";
import { useRouter } from "next/router";
import DashboardProvider from "@components/Dashboard/Provider";
import { DashboardButton } from "@components/Layout/Dashboard";
import { DashboardPage } from "@typeDefs/auth";
// import { GET_CURRENT_USER_TRIPS } from "@queries/trips";
// import { getAuthApolloClient } from "@services/apollo/client";
// import { Trip } from "@typeDefs/destinations";
import EmailConfirm from "@components/Dashboard/Overview/EmailConfirm";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import ROUTES from "@constants/routes";
import Promotion from "@components/Dashboard/Overview/Promotion";
import DashboardOverviewSidebar from "@components/Dashboard/Overview/Sidebar";
import DashboardOverviewNotification from "@components/Dashboard/Overview/Notification";
import { Notification } from "@typeDefs/notification";
import { getAuthApolloClient } from "@services/apollo/client";
import { GET_NOTIFICATIONS } from "@queries/notifications";
import Icon from "@components/Layout/Icon";

interface Props extends DashboardPage {
  data: {
    notifications: Notification[];
  };
}

const Dashboard: NextPage<Props> = ({
  currentUser,
  data: { notifications },
}: Props) => {
  const { t } = useTranslation("dashboard/overview");
  const router = useRouter();

  return (
    <DashboardProvider
      title={t("sidebar.overview")}
      currentUser={currentUser}
      buttons={
        <>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_NOTIFICATIONS);
            }}
            mode={"darker"}
          >
            <Icon name={"bell"} fill />
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.DASHBOARD_INBOX);
            }}
            mode={"darker"}
          >
            <Icon name={"message-2"} fill />
          </DashboardButton>
          <DashboardButton
            onClick={() => {
              router.push(ROUTES.HOME);
            }}
          >
            <Icon name={"home-5"} fill />
          </DashboardButton>
        </>
      }
    >
      <Container>
        <Main>
          {currentUser && currentUser.status === "unverified" && (
            <EmailConfirm email={currentUser.email} />
          )}
          <Promotion />
          <MainRow>
            <MainCol></MainCol>
            <MainCol>
              <DashboardOverviewNotification notifications={notifications} />
            </MainCol>
          </MainRow>
        </Main>
        <DashboardOverviewSidebar />
      </Container>
    </DashboardProvider>
  );
};

const Container = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
  }
`;

const Main = styled.main`
  display: flex;
  padding: 15px;
  flex-direction: column;
  width: calc(100% - 15px * 2);
`;

const MainRow = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: -15px;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    flex-direction: column;
  }
`;

const MainCol = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(50% - 15px);
  margin-left: 15px;

  :first-child {
    padding-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    width: calc(100% - 15px);
  }
`;

Dashboard.getInitialProps = async (ctx) => {
  const { query } = await getAuthApolloClient(ctx);
  const {
    data: { getNotifications },
  }: { data: { getNotifications: Notification[] } } = await query({
    query: GET_NOTIFICATIONS,
  });

  return {
    data: {
      notifications: getNotifications,
    },
  };
};

export default Dashboard;
