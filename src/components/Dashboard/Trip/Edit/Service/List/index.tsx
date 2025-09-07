import React from "react";

import styled from "styled-components";

import { TripService } from "@typeDefs/destinations";
import TripListCard from "./Card";

type Props = {
  services: TripService[];
};

const TripServiceList: React.FC<Props> = ({ services }: Props) => {
  return (
    <Wrapper>
      {services.map((service: TripService) => (
        <TripListCard key={service.id} service={service} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default TripServiceList;
