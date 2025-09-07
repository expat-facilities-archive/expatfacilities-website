import "swiper/css";
import "swiper/css/pagination";
import Wrapper from "@components/Wrapper";
import { NextPage } from "next";
import LayoutMain from "@components/Layout/Main";
import LayoutContainer from "@components/Layout/Container";
import Head from "@components/Head";
import React from "react";
import AboutUs from "@components/About/AboutUs";
import FastFacts from "@components/About/FastFacts";
import TeamList from "@components/About/Team/List";
import Background from "@components/Background";
import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import Ambassador from "@components/Home/Ambassador";
import CommunityCarousel from "@components/Carousel/Community";

const About: NextPage = () => {
  const { t } = useTranslation("about/common");

  return (
    <Wrapper>
      <LayoutMain>
        <Head title={t("head.title")} description={t("head.description")} />
        <LayoutContainer>
          <Background src={"/static/images/backgrounds/about.jpg"} />
          <Header>
            <Title>{t("title")}</Title>
            <Subtitle>{t("subtitle")}</Subtitle>
          </Header>
          <AboutUs />
          <FastFacts />
          <TeamList />
          <Ambassador />
          <CommunityCarousel />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  display: flex;
  text-align: center;
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.extraBold};
  font-size: ${({ theme }) => theme.size.extraTitle};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.medium};
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.lighter};
`;

export default About;
