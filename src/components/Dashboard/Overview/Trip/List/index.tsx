import { Trip } from "@typeDefs/destinations";
import styled from "styled-components";
import DashboardTravelListCard from "./Card";

type Props = {
  data: Trip[];
};

const DashboardTravelList: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      {data &&
        data.map((item: Trip, index: number) => (
          <DashboardTravelListCard key={index} data={item} />
        ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 0 15px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    justify-content: initial;
  }
`;

export default DashboardTravelList;
