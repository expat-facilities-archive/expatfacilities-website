import styled from "styled-components";
import Card from "@components/About/FastFacts/List/Card";
import statsData from "@data/stats";
import { Data } from "@typeDefs/about";

const List: React.FC = () => {
  return (
    <Container>
      {statsData.map((item: Data, i: number) => (
        <Card data={item} key={i} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-left: -10px;
  flex-direction: row;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    justify-content: center;
    align-items: center;
  }
`;

export default List;
