import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";
import Image from "@components/Image";
import useTranslation from "@hooks/useTranslation";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import { APP_NAME } from "@constants/main";
import isEven from "@utils/isEven";
import { ambassadors } from "@data/ambassadors";

const AmbassadorCarousel: React.FC = () => {
  const { t } = useTranslation("ambassador/common");
  const DELAY = 500;
  const SPEED = 1000;
  const SPACEBETWEEN = 30;

  return (
    <Container>
      <ContainerText>
        <h3>{t("ambassadorsPictures.title")}</h3>
        <p>{t("ambassadorsPictures.subtitle")}</p>
      </ContainerText>
      <SwipersContainer>
        <BorderGradient />
        <StyledSwiper
          slidesPerView={"auto"}
          loop={true}
          grabCursor={false}
          spaceBetween={SPACEBETWEEN}
          autoplay={{
            delay: DELAY,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          speed={SPEED}
          freeMode={{
            enabled: true,
            momentum: true,
          }}
          modules={[Autoplay, FreeMode]}
        >
          {ambassadors.map((ambassador, i) => {
            if (isEven(i))
              return (
                <SwiperSlide key={i}>
                  <Gradient>
                    <BackDropText>
                      <BackdropName>{ambassador.name}</BackdropName>
                      <BackdropCountry>{ambassador.country}</BackdropCountry>
                    </BackDropText>
                  </Gradient>
                  <Thumbnail
                    src={ambassador.thumbnailUrl}
                    alt={`${ambassador.name} - ${APP_NAME}`}
                    width={120}
                    height={120}
                  />
                </SwiperSlide>
              );
          })}
        </StyledSwiper>

        <ReversedStyledSwiper
          slidesPerView={"auto"}
          loop={true}
          spaceBetween={SPACEBETWEEN}
          grabCursor={false}
          loopedSlides={11}
          autoplay={{
            delay: DELAY,
            disableOnInteraction: false,
            reverseDirection: true,
          }}
          speed={SPEED}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          modules={[Autoplay, FreeMode]}
        >
          {ambassadors.map((ambassador, i) => {
            if (!isEven(i))
              return (
                <SwiperSlide key={i}>
                  <Gradient>
                    <BackDropText>
                      <BackdropName>{ambassador.name}</BackdropName>
                      <BackdropCountry>{ambassador.country}</BackdropCountry>
                    </BackDropText>
                  </Gradient>
                  <Thumbnail
                    src={ambassador.thumbnailUrl}
                    alt={`${ambassador.name} - ${APP_NAME}`}
                    width={120}
                    height={120}
                  />
                </SwiperSlide>
              );
          })}
        </ReversedStyledSwiper>
      </SwipersContainer>
    </Container>
  );
};

const Container = styled.section`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h3 {
    font-size: ${({ theme }) => theme.size.large};
    font-weight: ${({ theme }) => theme.weight.bold};
  }
  span {
    color: ${({ theme }) => theme.colors.accent.dark};
  }
  p {
    font-size: ${({ theme }) => theme.size.normal};
    margin-top: 10px;
  }
`;

const ContainerText = styled.div`
  text-align: center;
`;

const SwipersContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 30px;
`;

const BorderGradient = styled.div`
  z-index: 999;
  width: 100%;
  height: 100%;
  position: absolute;
  pointer-events: none;
  background: rgba(0, 0, 0, 0);
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.layout.darkest} 6%,
    transparent,
    ${({ theme }) => theme.colors.layout.darkest} 94%
  );
`;

const StyledSwiper = styled(Swiper)`
  height: 100%;
  .swiper-slide {
    width: 120px !important;
    position: relative;
  }
`;

const ReversedStyledSwiper = styled(StyledSwiper)`
  transform: rotate(180deg);
  margin-top: 20px;
  .swiper-slide {
    transform: rotate(-180deg);
  }
`;

const Thumbnail = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
`;

const Gradient = styled.div`
  transition: 0.5s;
  opacity: 0;
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.dark, 0.3)};
  position: fixed;
  z-index: 99;
  width: 120px;
  height: 120px;
  border-radius: 10px;
  :hover {
    opacity: 1;
  }
`;

const BackDropText = styled.div`
  text-align: center;
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
`;

const BackdropName = styled.span`
  color: ${({ theme }) => theme.colors.text.lightest} !important;
  font-size: ${({ theme }) => theme.size.tiny};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const BackdropCountry = styled.span`
  color: ${({ theme }) => theme.colors.text.lightest} !important;
  font-size: ${({ theme }) => theme.size.tiny};
  font-weight: ${({ theme }) => theme.weight.medium};
`;

export default AmbassadorCarousel;
