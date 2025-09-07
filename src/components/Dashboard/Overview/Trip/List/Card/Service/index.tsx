import styled from "styled-components";
import DashboardTravelServiceList from "./List";

const DashboardTravelService: React.FC = () => {
  return (
    <Container>
      <Title>Services</Title>
      <DashboardTravelServiceList />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const Title = styled.div`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

export default DashboardTravelService;
