import styled from "styled-components";
import DashboardOverviewSidebarInbox from "./Inbox";
import DashboardOverviewSidebarInstagram from "./Instagram";

const DashboardOverviewSidebar: React.FC = () => {
  return (
    <Container>
      <DashboardOverviewSidebarInbox />
      <DashboardOverviewSidebarInstagram />
    </Container>
  );
};

const Container = styled.aside`
  padding: 15px;
  padding-left: 0;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    padding-left: 15px;
    max-width: calc(100% - 15px * 2);
  }
`;

export default DashboardOverviewSidebar;
