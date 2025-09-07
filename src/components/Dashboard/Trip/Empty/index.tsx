import {
  DashboardButton,
  DashboardSection,
} from "@components/Layout/Dashboard";
import ROUTES from "@constants/routes";
import { useRouter } from "next/router";
import styled from "styled-components";

interface Props {
  large?: boolean;
}

const TripEmpty: React.FC<Props> = ({ large }: Props) => {
  const router = useRouter();

  return (
    <Container large={large}>
      <Thumbnail
        draggable={false}
        src={"/static/images/dashboard/travelers.svg"}
        width={200}
        height={138}
      />
      <Title>{"No expatriation booked... yet!"}</Title>
      <Description>
        {
          "It's time to take out your suitcases and prepare for your next adventure!"
        }
      </Description>
      <SearchButton
        onClick={() => {
          router.push(ROUTES.HOME);
        }}
      >
        {"Start a search"}
      </SearchButton>
    </Container>
  );
};

const Container = styled(DashboardSection)<{ large?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  ${({ large }) => large && "height: 100%"};
`;

const Thumbnail = styled.img`
  width: 100%;
  max-width: 200px;
  height: auto;
`;

const Title = styled.h1`
  margin-top: 30px;
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.semiBold};
`;

const Description = styled.p`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.light};
`;

const SearchButton = styled(DashboardButton)`
  margin-top: 15px;
`;

export default TripEmpty;
