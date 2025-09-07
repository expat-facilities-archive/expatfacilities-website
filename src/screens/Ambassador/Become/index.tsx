import Wrapper from "@components/Wrapper";
import LayoutContainer from "@components/Layout/Container";
import useTranslation from "@hooks/useTranslation";
import Head from "@components/Head";
import Background from "@components/Background";
import Header from "@components/Ambassador/Become/Header";
import Pictures from "@components/Ambassador/Social";
import styled from "styled-components";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import { NextPage } from "next";
import CommunityCarousel from "@components/Carousel/Community";

const BecomeAmbassador: NextPage = () => {
  const { t } = useTranslation("ambassador/become");

  return (
    <Wrapper>
      <LayoutContainer>
        <Head title={t("head.title")} description={t("head.description")} />
        <Background src={"/static/images/backgrounds/become-ambassador.jpg"} />
        <Header />
        <Container>
          <Question>{t("what_ambassador")}</Question>
          <ContainerAnswer>
            <Answer>{t("answer_what_ambassador.first")}</Answer>
            <br />
            <Answer>{t("answer_what_ambassador.second")}</Answer>
            <br />
            <Answer>{t("answer_what_ambassador.third")}</Answer>
          </ContainerAnswer>
        </Container>
        <Container>
          <Question>{t("how_to_become_ambassador")}</Question>
          <ContainerAnswer>
            <Answer>{t("answer_how_to_become_ambassador.first")}</Answer>
            <Answer>{t("answer_how_to_become_ambassador.second")}</Answer>
          </ContainerAnswer>
        </Container>
        <Container>
          <Question>{t("compensation")}</Question>
          <ContainerAnswer>
            <Answer>{t("answer_compensation.first")}</Answer>
          </ContainerAnswer>
        </Container>
        <CommunityCarousel />
        <Pictures />
      </LayoutContainer>
    </Wrapper>
  );
};
const Container = styled.section`
  padding: 40px;
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
  margin-bottom: 20px;
`;
const ContainerAnswer = styled.div``;
const Answer = styled.p``;

export default BecomeAmbassador;
