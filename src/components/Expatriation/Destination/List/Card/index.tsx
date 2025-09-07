import Link from "@components/Layout/Link";
import styled from "styled-components";
import ROUTES from "@constants/routes";
import React from "react";
import { Country } from "src/types/destinations";
import { animated, useSpring } from "react-spring";
import useTranslation from "@hooks/useTranslation";

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 35,
  (x - window.innerWidth / 2) / 35,
  1.05,
];
const trans = (x: number, y: number, s: number): string =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

interface Props {
  data: Country;
}

const DestinationListCard: React.FC<Props> = ({
  data: { slug, name, thumbnailUrl, cities },
}: Props) => {
  const [style, animate] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 2, tension: 350, friction: 40 },
  }));
  const { t: tCountry } = useTranslation("data/countries", false);

  return (
    <Container
      title={tCountry(name)}
      itemProp={"url"}
      href={`${ROUTES.EXPATRIATION}/${slug}`}
      thumbnailUrl={thumbnailUrl}
      onMouseMove={({
        clientX: x,
        clientY: y,
      }: {
        clientX: number;
        clientY: number;
      }) => animate.start({ xys: calc(x, y) })}
      onMouseLeave={() => animate.start({ xys: [0, 0, 1] })}
      style={{ transform: style.xys.to(trans) }}
    >
      <Content>
        <Title>{tCountry(name)}</Title>
        {cities && (
          <Description>
            {cities.map((city) => city.name).join(", ")}
          </Description>
        )}
      </Content>
    </Container>
  );
};

const Container = styled(animated(Link))<{ thumbnailUrl: string }>`
  position: relative;
  width: calc(25% - 30px);
  height: 200px;
  margin-top: 15px;
  margin-left: 30px;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.1s ease;
  background: ${({ theme }) => theme.colors.layout.darkest};
  background-image: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      ${({ theme }) => theme.colors.layout.darkest} 100%
    ),
    url(${({ thumbnailUrl }) => thumbnailUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    min-width: 175px;
    width: calc(75vw - 30px);
    height: 250px;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  height: calc(100% - 30px * 2);
  width: calc(100% - 30px * 2);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 1s;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-transform: uppercase;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  color: ${({ theme }) => theme.colors.text.light};
  font-style: italic;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default DestinationListCard;
