import { Country } from "src/types/destinations";
import styled from "styled-components";
import DestinationListCard from "./Card";

interface Props {
  data: Country[];
}

const DestinationList: React.FC<Props> = ({ data }: Props) => {
  return (
    <Container>
      {data.map((country: Country, i: number) => (
        <DestinationListCard data={country} key={i} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -30px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-wrap: nowrap;
    overflow-x: scroll;
    scrollbar-width: none;
    margin-left: -45px;
    margin-right: -15px;
    padding: 0 15px;

    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

export default DestinationList;
