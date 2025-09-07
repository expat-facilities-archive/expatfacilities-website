import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import { Trip, TripService } from "@typeDefs/destinations";
import { useRouter } from "next/router";
import { formatAmount } from "src/utils/formatAmount";
import styled from "styled-components";

type Props = {
  data: Trip;
};

const DashboardTripListCard: React.FC<Props> = ({ data: trip }: Props) => {
  const { t } = useTranslation("data/services");
  const { t: tCountry } = useTranslation("data/countries", false);
  const router = useRouter();
  const handleClick = () => {
    router.push(`${ROUTES.DASHBOARD_TRIPS}/${trip.id}`);
  };

  return (
    <Container onClick={handleClick}>
      <Thumbnail thumbnailUrl={trip.city.country.thumbnailUrl}>
        {trip.services &&
          trip.services.map((item: TripService, index: number) => (
            <Service key={index}>{t(item.service.name)}</Service>
          ))}
      </Thumbnail>
      <Title>
        <Destination>{`${trip.city.name}, ${tCountry(
          trip.city.country.name
        )}`}</Destination>
        <TotalPrice>{formatAmount(trip.totalPrice)}</TotalPrice>
      </Title>
    </Container>
  );
};

const Thumbnail = styled.div<{ thumbnailUrl: string }>`
  position: relative;
  width: 100%;
  height: 150px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      ${({ theme }) => theme.colors.layout.darkest} 100%
    ),
    url(${({ thumbnailUrl }) => thumbnailUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid ${({ theme }) => theme.colors.layout.darkest};
  border-radius: 4px;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const Container = styled.div`
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 250px;
  cursor: pointer;

  ${Thumbnail}:hover {
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

const Service = styled.div`
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.small};
`;

const Destination = styled.span``;

const TotalPrice = styled.span``;

export default DashboardTripListCard;
