import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "@components/Image";
import useTranslation from "@hooks/useTranslation";
import useBreakpoint from "@hooks/useBreakpoint";
import { Autoplay } from "swiper";

const CommunityCarousel: React.FC = () => {
  const { t } = useTranslation("ambassador/become");
  const breakpoint = useBreakpoint();
  const slidesPerView = breakpoint.isMobile
    ? 3
    : breakpoint.isTablet
    ? 4
    : breakpoint.isLaptop
    ? 6
    : breakpoint.isDesktop
    ? 7
    : 7;

  return (
    <Container>
      <ContainerText>
        <Title>
          {t("pictures.first")} <Accent>{t("pictures.second")}</Accent>
          {t("pictures.third")}
        </Title>
        <Description>
          {t("pictures.fourth")} <Accent>{t("pictures.fifth")}</Accent>
          {t("pictures.sixth")}
        </Description>
      </ContainerText>
      <ContainerSwiper>
        <StyledSwiper
          slidesPerView={slidesPerView}
          spaceBetween={20}
          autoplay={{
            delay: 1000 * 10,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          {Array.from({ length: 16 + 1 }).map((_, index) => {
            if (index === 0) return null;
            return (
              <SwiperSlide key={index}>
                <ThumbnailImage
                  src={`/static/images/ambassador/carousel/carousel-${index}.jpg`}
                  className={""}
                  alt={`image-${index}`}
                  width={170}
                  height={170}
                />
              </SwiperSlide>
            );
          })}
        </StyledSwiper>
      </ContainerSwiper>
    </Container>
  );
};

const Container = styled.section`
  margin-top: 30px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Description = styled.p`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.normal};
`;

const Accent = styled.span`
  color: ${({ theme }) => theme.colors.accent.light};
`;

const ContainerText = styled.div`
  text-align: center;
`;

const ContainerSwiper = styled.div`
  margin-top: 50px;
  width: 100%;
`;

const StyledSwiper = styled(Swiper)<{ modules: any }>`
  position: relative;
  height: 100%;
  margin-top: 15px;
`;

const ThumbnailImage = styled(Image)`
  border-radius: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

export default CommunityCarousel;
