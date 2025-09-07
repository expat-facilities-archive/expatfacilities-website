import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/virtual";

import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCoverflow, Autoplay, Pagination } from "swiper";
import { Country } from "@typeDefs/destinations";
import useBreakpoint from "@hooks/useBreakpoint";
import DestinationCard from "./Card";
import useTranslation from "@hooks/useTranslation";

interface Props {
  countries: Country[];
}

const DestinationCarousel: React.FC<Props> = ({ countries }: Props) => {
  const { isMobile } = useBreakpoint();
  const { t } = useTranslation("home/expatriation");

  return (
    <Container>
      <TitleContainer>
        <Title>{t("title")}</Title>
        <Subtitle>{t("subtitle")}</Subtitle>
      </TitleContainer>
      <Slider
        effect={"coverflow"}
        slidesPerView={isMobile ? 1 : 3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 400,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={false}
        autoplay={{
          delay: 4500,
        }}
        modules={[EffectCoverflow, Autoplay, Pagination]}
        loop={true}
      >
        {countries.map((country, i) => (
          <SwiperSlide key={i}>
            <DestinationCard country={country} />
          </SwiperSlide>
        ))}
      </Slider>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 60px;
  user-select: none;

  .swiper {
    .swiper-slide {
      filter: brightness(0.6);
      @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
        filter: brightness(1);
      }

      img {
        width: 25%;
        height: 100%;
        border-radius: 8px;
      }
    }

    .swiper-slide-next {
      filter: brightness(1);
    }

    .swiper-pagination {
      margin-top: 30px;
      position: relative !important;
      .swiper-pagination-bullet {
        background-color: ${({ theme }) => theme.colors.accent.dark};
        width: 14px;
        height: 14px;
      }
    }
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.large};
  }
`;

const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.size.normal};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
  }
`;

const Slider = styled(Swiper)`
  margin-top: 40px;
`;

export default DestinationCarousel;
