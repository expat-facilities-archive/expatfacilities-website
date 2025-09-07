import Image from "@components/Image";
import Link from "@components/Layout/Link";
import styled from "styled-components";
import { InstagramPost } from "@typeDefs/instagram";
import React from "react";
import Skeleton from "@components/Layout/Skeleton";

interface Props {
  post: InstagramPost | undefined;
}

const InstagramCard: React.FC<Props> = ({ post }: Props) => {
  const [height, setHeight] = React.useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) setHeight(containerRef.current.clientWidth);
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (containerRef.current) setHeight(containerRef.current.clientWidth);
  };

  if (!post)
    return (
      <ThumbnailContainer
        as={Skeleton}
        ref={containerRef}
        height={height}
        width={"calc(33.3% - 10px)"}
      />
    );

  return (
    <ThumbnailContainer
      height={height}
      ref={containerRef}
      href={post.permalink}
    >
      {post.media_type === "VIDEO" ? (
        <ThumbnailVideo
          autoPlay
          muted
          loop
          playsInline
          preload={"auto"}
          src={post.media_url}
        />
      ) : (
        <Thumbnail
          src={post.media_url}
          alt={post.caption}
          width={200}
          height={200}
        />
      )}
    </ThumbnailContainer>
  );
};

const ThumbnailContainer = styled(Link)<{ height: number }>`
  position: relative;
  height: ${({ height }) => height}px;
  margin-top: 10px;
  margin-left: 10px;
  width: calc(33.3% - 10px);
  border-radius: 5px;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: calc(25% - 10px);
  }
`;

const Thumbnail = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

const ThumbnailVideo = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  object-fit: cover;
`;

export default InstagramCard;
