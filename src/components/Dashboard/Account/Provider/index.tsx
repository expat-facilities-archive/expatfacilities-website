import { DashboardButton } from "@components/Layout/Dashboard";
import DashboardProvider from "@components/Dashboard/Provider";
import { AuthContext } from "@context/Auth";
import { DashboardPage } from "@typeDefs/auth";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import AccountSidebar from "@components/Dashboard/Account/Sidebar";
import router from "next/router";
import ROUTES from "@constants/routes";
import Icon from "@components/Layout/Icon";
import useBreakpoint from "@hooks/useBreakpoint";
import React from "react";

interface Props extends DashboardPage {
  title: string;
  buttons: boolean;
  children: React.ReactNode;
}

const DashboardAccountProvider: React.FC<Props> = ({
  currentUser,
  title,
  buttons,
  children,
}: Props) => {
  const { t } = useTranslation("dashboard/overview");
  const { logout } = React.useContext(AuthContext);

  const { isTablet, isMobile } = useBreakpoint();
  return (
    <DashboardProvider
      title={`${t("sidebar.settings")} > ${title}`}
      currentUser={currentUser}
      buttons={
        <>
          {isTablet && !buttons && (
            <DashboardButton
              onClick={() => {
                router.push(ROUTES.DASHBOARD_ACCOUNT);
              }}
              prefix={
                isMobile ? undefined : (
                  <Icon name={"arrow-drop-left"} size={20} />
                )
              }
              mode={"darker"}
            >
              {isMobile ? <Icon name={"arrow-drop-left"} size={20} /> : "Back"}
            </DashboardButton>
          )}
          <DashboardButton
            onClick={() => {
              logout();
            }}
            prefix={
              isMobile ? undefined : <Icon name={"logout-box-r"} size={20} />
            }
            mode={"darker"}
          >
            {isMobile ? <Icon name={"logout-box-r"} size={20} /> : "Log Out"}
          </DashboardButton>
        </>
      }
    >
      <Container>
        {!isTablet && <AccountSidebar />}
        <Content>{children}</Content>
      </Container>
    </DashboardProvider>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  height: calc(100% - 15px);
  padding-bottom: 15px;
`;

export default DashboardAccountProvider;
