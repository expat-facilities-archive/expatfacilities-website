import React from "react";
import styled from "styled-components";

const Featured: React.FC = () => {
  return (
    <Container>
      <Title>{"Expat Facilities"}</Title>
      <Description>{"À propos de nous"}</Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.extraTitle};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Description = styled.p`
  margin-top: 30px;
  font-size: ${({ theme }) => theme.size.title};
`;

export default Featured;
