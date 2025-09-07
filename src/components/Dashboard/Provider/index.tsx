import React from "react";
import styled from "styled-components";

import Sidebar from "../Sidebar";
import Head from "@components/Head";
import { DashboardButtonContainer } from "@components/Layout/Dashboard";
import useTranslation from "@hooks/useTranslation";
import { User } from "@typeDefs/user";
import useBreakpoint from "@hooks/useBreakpoint";
import Icon from "@components/Layout/Icon";

type Props = {
  title: string;
  buttons?: React.ReactNode;
  children: React.ReactNode;
  currentUser?: User;
};

const DashboardProvider: React.FC<Props> = ({
  title,
  buttons,
  children,
  currentUser,
}: Props) => {
  const { t } = useTranslation("dashboard/common");
  const { isMobile } = useBreakpoint();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Container>
      <Head title={t("title")} subtitle={title} />
      {currentUser && ((isMobile && isSidebarOpen) || !isMobile) && (
        <Sidebar user={currentUser} close={closeSidebar} />
      )}
      <Main>
        <Header>
          {isMobile ? (
            <Icon
              name={"menu"}
              size={25}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          ) : (
            <Title>{title}</Title>
          )}
          {buttons && (
            <DashboardButtonContainer>{buttons}</DashboardButtonContainer>
          )}
        </Header>
        <Content>{children}</Content>
      </Main>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  height: 100%;
`;

export const Main = styled.div`
  opacity: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: row-reverse;
  }
`;

export const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow: auto;
`;

export default DashboardProvider;
