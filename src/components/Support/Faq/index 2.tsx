import styled from "styled-components";
import subjectsData from "@data/subjects";
import { Subject } from "@typeDefs/faq";
import React from "react";

const Faq: React.FC = () => {
  return (
    <Container>
      <Title>Foire Aux Questions</Title>
      <Description>
        {
          "Tu peux également parcourir les rubriques ci-dessous pour trouver ce que tu cherches."
        }
      </Description>
      <Row>
        {subjectsData.map(
          (
            { backgroundColor, textColor, title, subtitle, content }: Subject,
            i: number
          ) => {
            return (
              <Card
                key={i}
                backgroundColor={backgroundColor}
                textColor={textColor}
              >
                <CardTitle>{title}</CardTitle>
                <CardSubTitle>{subtitle}</CardSubTitle>
                <CardContent>{content}</CardContent>
              </Card>
            );
          }
        )}
      </Row>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Description = styled.p`
  margin-top: 20px;
  max-width: 500px;
  line-height: 1.25;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin-left: -30px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    align-items: center;
    justify-content: initial;
  }
`;

const Card = styled.div<{
  backgroundColor: string;
  textColor: string;
}>`
  width: calc(33.3% - 30px * 2);
  padding: 15px;
  margin-left: 30px;
  margin-top: 30px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: calc(100% - 10px);
  }
`;

const CardTitle = styled.h3`
  color: rgb(255, 66, 0);
  font-size: ${({ theme }) => theme.size.medium};
`;

const CardSubTitle = styled.div`
  margin-top: 40px;
  font-size: ${({ theme }) => theme.size.medium};
`;

const CardContent = styled.button`
  margin-top: 15px;
  color: ${({ theme }) => theme.colors.text.light};
  background-color: inherit;
  border: none;
  cursor: pointer;
  padding: 0px;
`;

export default Faq;
