import router from "next/router";
import React from "react";
import { formatAmount } from "@utils/formatAmount";

import styled from "styled-components";
import { Trip } from "@typeDefs/destinations";
import ROUTES from "@constants/routes";

type Props = {
  trips: Trip[];
};

const TripCardList: React.FC<Props> = ({ trips }: Props) => {
  const HandleClickGoToTrip = (id: string) => {
    router.push(`${ROUTES.DASHBOARD_TRIPS}/${id}`);
  };
  return (
    <Container nbItem={trips.length}>
      {trips.map((trip: Trip) => (
        <TripCard
          key={trip.id}
          onClick={() => {
            HandleClickGoToTrip(trip.id);
          }}
        >
          <ImgTrip bgUrl={trip.city.country.thumbnailUrl} />
          <Info>
            <City>{trip.city.name}</City>
            <Price>{formatAmount(trip.totalPrice)}</Price>
          </Info>
        </TripCard>
      ))}
    </Container>
  );
};

const Container = styled.div<{ nbItem: number }>`
  margin: 15px;
  display: flex;
  flex-flow: row wrap;
  box-sizing: border-box;
  ${({ nbItem }) =>
    nbItem > 1 ? "justify-content: end;" : "justify-content: center;"}
`;

const TripCard = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  color: ${({ theme }) => theme.colors.text.lightest};
  border: 1px solid ${({ theme }) => theme.colors.layout.darker};
  box-sizing: border-box;
  width: calc(100% / 2 - 10px);
  cursor: pointer;
  &:nth-child(even) {
    margin-left: 20px;
  }
  &:nth-child(n + 2) {
    margin-top: 20px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    &:nth-child(even) {
      margin-left: 0;
    }
    &:nth-child(n + 1) {
      margin-top: 20px;
    }
  }
`;

const ImgTrip = styled.div<{ bgUrl: string }>`
  background: ${({ bgUrl }) => `url(${bgUrl})`};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 10px;
  width: 100%;
  padding-bottom: 100%;
`;

const Info = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const City = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Price = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.colors.accent.light};
`;

export default TripCardList;
