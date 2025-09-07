import styled from "styled-components";
import DashboardFooterList from "./List";

const DashboardFooter: React.FC = () => {
  return (
    <Container>
      <DashboardFooterList />
    </Container>
  );
};

const Container = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: none;
  }
`;

export default DashboardFooter;
