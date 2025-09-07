import "react-credit-cards-2/dist/es/styles-compiled.css";

import React from "react";

import Cards, { ReactCreditCardsProps } from "react-credit-cards-2";
import styled from "styled-components";

type Props = ReactCreditCardsProps & {
  className?: string;
};

const CreditCardPreview: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Card {...props} />
    </Container>
  );
};

const Container = styled.div``;

const Card = styled(Cards)``;

export default CreditCardPreview;
