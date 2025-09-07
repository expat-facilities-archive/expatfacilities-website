import Image from "@components/Image";
import Button from "@components/Layout/Button";
import Link from "@components/Layout/Link";
import React from "react";
import styled from "styled-components";

interface Props {
  link: string;
  thumbnailUrl: string;
  title: string;
  subtitle: string;
  mail: string;
}

const TeamListCard: React.FC<Props> = ({
  link,
  thumbnailUrl,
  title,
  subtitle,
  mail,
}: Props) => {
  const [height, setHeight] = React.useState<number>(0);

  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) setHeight(containerRef.current.clientWidth);
    window.addEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (containerRef.current) setHeight(containerRef.current.clientWidth);
  };

  return (
    <Container href={link} title={title}>
      <ThumbnailContainer ref={containerRef} height={height}>
        <ThumbnailImage
          src={thumbnailUrl}
          width={100}
          height={100}
          alt={`${title} - ${subtitle}`}
        />
        <EmailButton
          mode={"darkest"}
          onClick={() => {
            location.href = "mailto:" + mail;
          }}
        >
          {mail}
        </EmailButton>
      </ThumbnailContainer>
      <Content>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </Content>
    </Container>
  );
};

const ThumbnailImage = styled(Image)`
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
  transition: all 0.25s;
`;

const EmailButton = styled(Button)`
  z-index: 1;
  max-width: 250px;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  visibility: hidden;
  font-size: ${({ theme }) => theme.size.normal};
`;

const Container = styled(Link)`
  width: calc(33.3% - 10px);
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 10px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.lightest};
  display: flex;
  flex-direction: column;

  :hover {
    ${EmailButton} {
      visibility: visible;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 33.33%;
    height: 100%;
  }
`;

const ThumbnailContainer = styled.div<{ height: number }>`
  overflow: hidden;
  border-radius: 10px;
  width: 100%;
  height: ${({ height }) => height}px;
`;

const Content = styled.div`
  margin-top: 15px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: center;
    margin-top: 5px;
  }
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
  }
`;

const SubTitle = styled.h3`
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.medium};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
  }
`;

export default TeamListCard;
