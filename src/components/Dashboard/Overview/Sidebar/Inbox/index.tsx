import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import styled from "styled-components";

const DashboardOverviewSidebarInbox: React.FC = () => {
  return (
    <Container>
      <Link href={ROUTES.DASHBOARD_INBOX}>
        <Title>{"Inbox"}</Title>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 5px;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export default DashboardOverviewSidebarInbox;
