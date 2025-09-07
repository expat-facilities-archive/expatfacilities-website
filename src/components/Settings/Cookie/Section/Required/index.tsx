import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  description: string;
}

const CookieSectionRequired: React.FC<Props> = ({
  title,
  description,
}: Props) => {
  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Content>
      <Selector>
        <Label>{"Required"}</Label>
      </Selector>
    </Container>
  );
};

const Container = styled.section`
  padding: 60px 0;
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.semiBold};
`;

const Description = styled.p`
  margin-top: 10px;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
`;

const Selector = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 10px;
    width: 100%;
  }
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text.lightest};
  margin-right: 10px;
`;

export default CookieSectionRequired;
