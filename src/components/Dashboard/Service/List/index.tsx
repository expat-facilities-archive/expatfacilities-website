import React from "react";

import styled from "styled-components";

import ServiceListCard from "./Card";

import type { Service } from "@typeDefs/services";

type Props = {
  tripId: string;
  services: Service[];
};

const ServiceList: React.FC<Props> = ({ tripId, services }: Props) => {
  return (
    <List>
      {services.map((service: Service, index: number) => (
        <ServiceListCard key={index} tripId={tripId} service={service} />
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

export default ServiceList;
