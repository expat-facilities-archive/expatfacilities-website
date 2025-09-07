import { Trip } from "@typeDefs/destinations";
import styled from "styled-components";
import DashboardTravelList from "./List";
import TripEmpty from "@components/Dashboard/Trip/Empty";
import useTranslation from "@hooks/useTranslation";
interface Props {
  data: Trip[];
}

const DashboardTrip: React.FC<Props> = ({ data: trips }: Props) => {
  const { t } = useTranslation("dashboard/overview");
  return (
    <Container>
      <Header>{t("trip.header")}</Header>
      {trips && trips.length > 0 ? (
        <DashboardTravelList data={trips} />
      ) : (
        <TripEmpty />
      )}
    </Container>
  );
};

const Header = styled.div`
  padding: 0 15px 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 0;
`;

export default DashboardTrip;
