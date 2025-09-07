import Card from "./Card/index";
import styled from "styled-components";
import { graphState } from "@screens/Dashboard/Admin";
import { User } from "@typeDefs/user";
import { Trip } from "@typeDefs/destinations";

interface Props {
  setCurrentGraphState: React.Dispatch<React.SetStateAction<graphState>>;
  users: User[];
  trips: Trip[];
}

const AdminList: React.FC<Props> = ({
  setCurrentGraphState,
  users,
  trips,
}: Props) => {
  return (
    <Container>
      <Card
        data={{
          icon: { class: "team", color: "#9446D1" },
          title: "Utilisateurs",
          amount: users.length.toString(),
          evolution: { amount: "+2.00", time: "24 heures" },
        }}
        onClick={() => {
          setCurrentGraphState(graphState.USER_CREATED);
        }}
      />
      <Card
        data={{
          icon: { class: "shopping-basket-2", color: "#FF842B" },
          title: "Voyages",
          amount: trips.length.toString(),
          evolution: { amount: "+2.00", time: "24 heures" },
        }}
        onClick={() => {
          console.log("clicked");
          setCurrentGraphState(graphState.TRIP_CREATED);
        }}
      />
      <Card
        data={{
          icon: { class: "bar-chart", color: "#65BEFF" },
          title: "Services",
          amount: trips
            .map((trip) => trip.services.length)
            .reduce((a, b) => a + b, 0)
            .toString(),
          evolution: { amount: "+2.00", time: "24 heures" },
        }}
        onClick={() => {
          console.log("clicked");
          setCurrentGraphState(graphState.MOST_POPULAR_SERVICE);
        }}
      />
      <Card
        data={{
          icon: { class: "money-euro-circle", color: "#14B82E" },
          title: "Profit",
          amount: "NaN",
          evolution: { amount: "+2.00", time: "24 heures" },
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 0 15px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
  }
`;

export default AdminList;
