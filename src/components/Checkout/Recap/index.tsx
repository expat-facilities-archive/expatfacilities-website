import React from "react";

import styled from "styled-components";

import type { Trip } from "@typeDefs/destinations";

type Props = {
  trip: Trip;
};

const CheckoutRecap: React.FC<Props> = () => {
  return (
    <RecapContainer>
      <Title>{"Récapitulatif de commande"}</Title>
    </RecapContainer>
  );
};

const RecapContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
  justify-content: left;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.semiBold};
`;

export default CheckoutRecap;
