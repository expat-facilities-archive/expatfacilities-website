import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import { NextPage } from "next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import Image from "@components/Image";
import { Video } from "@data/ambassadors";

interface Props {
  videos: Video[];
}

const VideosCarousel: NextPage<Props> = ({ videos }: Props) => {
  const { t } = useTranslation("ambassador/common");
  const { t: countries } = useTranslation("data/countries");

  return (
    <Container>
      <StyledSwiper
        slidesPerView={1}
        rewind={true}
        grabCursor={false}
        spaceBetween={0}
        effect={"fade"}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          enabled: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
      >
        {videos.map((video: Video, i) => (
          <SwiperSlide key={i}>
            <VideoThumbnail
              src={video.videoUrl}
              alt={"image-1"}
              width={914}
              height={514}
            />
            <VideoName>
              {t("videos-carousel", [
                video.ambassadorName,
                countries(video.country),
              ])}
            </VideoName>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </Container>
  );
};

const Container = styled.section`
  padding: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;

  p {
    font-weight: ${({ theme }) => theme.weight.medium};
    font-size: ${({ theme }) => theme.size.normal};
    text-align: center;
  }
`;

const StyledSwiper = styled(Swiper)`
  width: 914px;
  overflow: visible;
  border-radius: 10px;
  .swiper-wrapper {
    padding-bottom: 40px;
  }
  .swiper-slide {
    p {
      opacity: 0;
    }
  }
  .swiper-slide-active {
    p {
      opacity: 1;
    }
  }
  .swiper-pagination {
    bottom: 0px;
    .swiper-pagination-bullet {
      width: 15px;
      height: 15px;
      background-color: ${({ theme }) => theme.colors.accent.dark} !important;
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

const VideoThumbnail = styled(Image)`
  border-radius: 10px;
  width: 914px;
  height: 514px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    height: 250px;
  }
`;
const VideoName = styled.p`
  font-size: ${({ theme }) => theme.size.medium};
  margin-top: 20px;
`;

export default VideosCarousel;
