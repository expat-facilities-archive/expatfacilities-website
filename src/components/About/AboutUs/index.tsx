import useTranslation from "@hooks/useTranslation";
import React from "react";
import styled from "styled-components";

const AboutUs: React.FC = () => {
  const { t } = useTranslation("about/aboutus");

  return (
    <Container>
      <Content>
        <Title>{t("title")}</Title>
        <Paragraph>{t("description.first")}</Paragraph>
        <Paragraph>{t("description.second")}</Paragraph>
        <Paragraph>{t("description.third")}</Paragraph>
      </Content>
    </Container>
  );
};
AboutUs.displayName = "AboutUs";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 90px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
  }
`;

const Title = styled.span`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Paragraph = styled.p`
  margin-top: 15px;
  max-width: 550px;
  text-align: justify;
  line-height: 1.5;

  :first-child {
    margin-top: 15px;
  }
`;

export default AboutUs;
