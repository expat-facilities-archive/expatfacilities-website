import React from "react";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper";

const Testimonials: React.FC = () => {
  const { t } = useTranslation("home/testimonials");

  return (
    <Container>
      <Title>{t("title")}</Title>
      <SubTitle>{t("subtitle")}</SubTitle>
      <Swiper
        autoplay={{ delay: 5000 }}
        effect={"fade"}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        noSwiping={true}
        fadeEffect={{ crossFade: true }}
        spaceBetween={30}
        navigation={false}
        modules={[Pagination, Navigation, EffectFade, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card>
            <CardRight>
              <CardTitle>{t("first.title")}</CardTitle>
              <CardText>{t("first.text")}</CardText>
            </CardRight>
          </Card>
          <Card>
            <CardRight>
              <CardTitle>{t("second.title")}</CardTitle>
              <CardText>{t("second.text")}</CardText>
            </CardRight>
          </Card>
        </SwiperSlide>
        <SwiperSlide>
          <Card>
            <CardRight>
              <CardTitle>{t("third.title")}</CardTitle>
              <CardText>{t("third.text")}</CardText>
            </CardRight>
          </Card>
          <Card>
            <CardRight>
              <CardTitle>{t("fourth.title")}</CardTitle>
              <CardText>{t("fourth.text")}</CardText>
            </CardRight>
          </Card>
        </SwiperSlide>
      </Swiper>
    </Container>
  );
};

const Container = styled.div`
  margin: 60px auto 0;

  .swiper {
    margin: 30px 0;

    .swiper-wrapper {
      .swiper-slide {
        display: flex;
        justify-content: space-between;

        @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
          flex-direction: column;
          gap: 10px;
        }
      }
    }
    .swiper-pagination {
      margin-top: 30px;
      position: relative !important;

      .swiper-pagination-bullet {
        background-color: ${({ theme }) => theme.colors.accent.light};
        width: 14px;
        height: 14px;
      }
    }
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  text-align: center;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.layout.dark};
  color: ${({ theme }) => theme.colors.accent.black};
  padding: 25px 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent.white};
  width: 44%;
  &:last-child {
    margin-left: 33px;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 83%;
    &:last-child {
      margin-left: 0;
    }
  }
`;

const CardRight = styled.div``;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const CardText = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  font-weight: ${({ theme }) => theme.weight.medium};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.normal};
    margin-top: 10px;
  }
`;

export default Testimonials;
