import PartnerCard from "./Card";
import styled, { keyframes } from "styled-components";
import { Partner } from "src/types/partners";
import React from "react";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import isEven from "@utils/isEven";

interface Props {
  data: Partner[];
}

const PartnerList: React.FC<Props> = ({ data }: Props) => {
  const rowAmount = 3;

  return (
    <Container>
      <SliderContainer>
        <Slider>
          {Array.from({ length: rowAmount }, (_, i: number) => (
            <Row offset={i - 1} key={i - 1}>
              {data.map((partner: Partner, i: number) => {
                if (isEven(i)) return <PartnerCard data={partner} key={i} />;
              })}
            </Row>
          ))}
        </Slider>
      </SliderContainer>
      <SliderContainer>
        <Slider>
          {Array.from({ length: rowAmount }, (_, i: number) => (
            <Row offset={i} key={i} reverse>
              {data.map((partner: Partner, i: number) => {
                if (!isEven(i)) return <PartnerCard data={partner} key={i} />;
              })}
            </Row>
          ))}
        </Slider>
      </SliderContainer>
      <Gradient />
    </Container>
  );
};
const getSlide = (childIndex: number, reverse: boolean) => {
  const from = childIndex * 100;
  const to = (reverse ? -100 : 100) + 100 * childIndex;

  return keyframes`
  from {
    transform: translateX(${from}%);
  }
  to {
    transform: translateX(${to}%);
  }
`;
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px;
  overflow: hidden;
  width: 100%;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 90px;
  position: relative;
  margin: 10px 0;
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  transition: all 0.6s linear;
`;

const Row = styled.div<{ offset: number; reverse?: boolean }>`
  position: absolute;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;
  animation: ${({ offset, reverse }) => getSlide(offset, reverse || false)} 60s
    linear infinite;

  @media (prefers-reduced-motion) {
    animation: none;
  }
`;

const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.layout.darkest} 0%,
    ${({ theme }) => convertRGBToRGBA(theme.colors.layout.darkest, 0)} 25%,
    ${({ theme }) => convertRGBToRGBA(theme.colors.layout.darkest, 0)} 75%,
    ${({ theme }) => theme.colors.layout.darkest} 100%
  );
`;

export default PartnerList;
