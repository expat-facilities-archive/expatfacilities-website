import React from "react";

import styled from "styled-components";

import type { TripService } from "@typeDefs/destinations";
import TripServiceCard from "./Card";

type Props = {
  tripId: string;
  tripServices: TripService[];
};

const TripServiceList: React.FC<Props> = ({ tripId, tripServices }: Props) => {
  return (
    <List>
      {tripServices.map((tripService: TripService, index: number) => (
        <TripServiceCard
          key={index}
          tripId={tripId}
          tripService={tripService}
          service={tripService.service}
        />
      ))}
    </List>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;

export default TripServiceList;
