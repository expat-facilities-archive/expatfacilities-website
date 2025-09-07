import styled from "styled-components";
import DashboardTravelServiceListCard from "./Card";

const DashboardTravelServiceList: React.FC = () => {
  return (
    <Container>
      <DashboardTravelServiceListCard />
      <DashboardTravelServiceListCard />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

export default DashboardTravelServiceList;
