import { NextPage } from "next";
import DashboardProvider from "@components/Dashboard/Provider";
import styled from "styled-components";
import { DashboardPage } from "@typeDefs/auth";
import useTranslation from "@hooks/useTranslation";
import DashboardNotification from "@components/Dashboard/Notification";
import { GET_NOTIFICATIONS } from "@queries/notifications";
import { getAuthApolloClient } from "@services/apollo/client";
import { Notification } from "@typeDefs/notification";

interface Props extends DashboardPage {
  data: { getNotifications: Notification[] };
}

const DashboardNotifications: NextPage<Props> = ({
  currentUser,
  data: { getNotifications: notifications },
}: Props) => {
  const { t } = useTranslation("dashboard/overview");

  return (
    <DashboardProvider
      currentUser={currentUser}
      title={t("sidebar.notifications")}
    >
      <Container>
        {notifications.map((notification: Notification, key: number) => (
          <DashboardNotification key={key} notification={notification} />
        ))}
      </Container>
    </DashboardProvider>
  );
};

DashboardNotifications.getInitialProps = async (ctx) => {
  const { query } = await getAuthApolloClient(ctx);
  const { data }: { data: { getNotifications: Notification[] } } = await query({
    query: GET_NOTIFICATIONS,
  });

  return {
    data,
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  margin-top: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    height: 100%;
  }
`;

export default DashboardNotifications;
