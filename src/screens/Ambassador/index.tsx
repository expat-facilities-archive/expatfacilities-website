import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styled from "styled-components";
import { NextPage } from "next";

import Wrapper from "@components/Wrapper";
import LayoutContainer from "@components/Layout/Container";
import useTranslation from "@hooks/useTranslation";
import Head from "@components/Head";
import Background from "@components/Background";
import Header from "@components/Ambassador/Header";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import YourAmbassador from "@components/Ambassador/YourAmbassador";
import VideosCarousel from "@components/Ambassador/VideoCarousel";
import AmbassadorSocial from "@components/Ambassador/Social";
import AmbassadorCarousel from "@components/Carousel/Ambassador";
import CommunityCarousel from "@components/Carousel/Community";
import Image from "@components/Image";

import { videos, yourAmbassadors } from "@data/ambassadors";

const BecomeAmbassador: NextPage = () => {
  const { t } = useTranslation("ambassador/common");

  return (
    <Wrapper>
      <LayoutContainer>
        <Head title={t("head.title")} description={t("head.description")} />
        <Background src={"/static/images/backgrounds/ambassador.jpg"} />
        <Header />
        <Container>
          <Question>{t("about.title")}</Question>
          <AboutImage
            src={"/static/images/ambassador/about.png"}
            width={800}
            height={200}
            alt={t("head.title")}
          />
          <ContainerAnswer>
            <Answer>{t("about.text.first")}</Answer>
            <br />
            <Answer>{t("about.text.second")}</Answer>
            <br />
            <Answer>{t("about.text.third")}</Answer>
          </ContainerAnswer>
        </Container>
        <VideosCarousel videos={videos} />
        <AmbassadorCarousel />
        <YourAmbassador yourAmbassadors={yourAmbassadors} />
        <CommunityCarousel />
        <AmbassadorSocial />
      </LayoutContainer>
    </Wrapper>
  );
};

const Container = styled.section`
  padding: 30px;
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darker, 0.3)};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;

  p {
    text-align: justify;
    font-weight: ${({ theme }) => theme.weight.medium};
    font-size: ${({ theme }) => theme.size.normal};
  }
`;

const Question = styled.h3`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const AboutImage = styled(Image)`
  margin-top: 15px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    height: 20%;
  }
`;

const ContainerAnswer = styled.div`
  margin-top: 15px;
`;

const Answer = styled.p``;

export default BecomeAmbassador;
