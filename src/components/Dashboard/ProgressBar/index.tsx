import useBreakpoint from "@hooks/useBreakpoint";
import { getSafePercent } from "@utils/getSafePercent";
import React from "react";
import { ReactNode } from "react-markdown/lib/react-markdown";

import styled from "styled-components";

type BarStep = {
  id: number;
  title: string;
  percent: number;
  content: string;
};
// TODO: BarStep should be available for translate. Add new json fr/en for title. content is mostly a date but need to be translated dynamically
type Props = {
  name: ReactNode;
  steps: BarStep[];
  progress: number;
  height?: number;
};

const ProgressBar: React.FC<Props> = ({
  name,
  steps,
  progress,
  height,
}: Props) => {
  const progression: number = getSafePercent(progress, 100);

  const breakPoint = useBreakpoint();

  const [numberElement, _setNumberElement] = React.useState<number>(
    steps.length
  );
  const [current, _] = React.useState<any>(
    steps.filter((step) => step.percent === progress)[0]
  );

  return (
    <Container>
      {name}
      <BoxProgressBar height={height} numberStep={numberElement}>
        {steps.map((step: BarStep) => (
          <Step
            key={step.id}
            accomplished={step.percent <= progression}
            active={step.percent === progression}
            data-title={step.title}
            data-content={step.content}
            numberChild={numberElement}
          >
            <StepInfo key={step.id} accomplished={step.percent <= progression}>
              <p>{step.title}</p>
              <p>{step.content}</p>
            </StepInfo>
          </Step>
        ))}
        <BackgroundBar progress={progression} />
      </BoxProgressBar>
      {numberElement > 4 ? (
        <BoxTablet>
          <BoxTabletTitle>{current.title}</BoxTabletTitle>
          <BoxTabletText>{current.content}</BoxTabletText>
        </BoxTablet>
      ) : (
        breakPoint.isTablet && (
          <BoxTablet>
            <BoxTabletTitle>{current.title}</BoxTabletTitle>
            <BoxTabletText>{current.content}</BoxTabletText>
          </BoxTablet>
        )
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const ModelProgressBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoxProgressBar = styled(ModelProgressBar)<{
  height?: number;
  numberStep: number;
}>`
  position: relative;
  height: ${({ height = 5 }) => height}px;
  border-radius: 5px;
  line-height: 1;
  background-color: ${({ theme }) => theme.colors.text.dark};
  align-items: center;
  z-index: 0;
  margin-top: 15px;
  margin-bottom: ${({ numberStep }) => (numberStep <= 4 ? "4rem" : "1rem")};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    margin-bottom: 1rem;
  }
`;

const StepInfo = styled.span<{ accomplished: boolean }>`
  position: absolute;
  visibility: hidden;
  color: ${({ accomplished, theme }) =>
    accomplished ? theme.colors.accent.light : theme.colors.text.dark};
  left: 50%;
  transform: translate(-50%, 0);
  top: 2.5rem;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.text.darker};
  z-index: 1;
  padding: 10px;
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  width: 200px;
  & > p:nth-child(1) {
    font-size: ${({ theme }) => theme.size.normal};
    font-weight: ${({ theme }) => theme.weight.bold};
  }
  & > p:nth-child(2) {
    margin-top: 5px;
    font-size: ${({ theme }) => theme.size.normal};
    font-weight: ${({ theme }) => theme.weight.regular};
  }
`;

const Step = styled.div<{
  accomplished: boolean;
  active: boolean;
  numberChild: number;
}>`
  width: 25px;
  height: 25px;
  border: 2px solid
    ${({ accomplished, theme }) =>
      accomplished ? theme.colors.accent.light : theme.colors.text.dark};
  background-color: ${({ accomplished, theme }) =>
    accomplished ? theme.colors.accent.light : theme.colors.layout.darker};
  border-radius: 50%;
  display: inline-block;
  position: relative;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    ${StepInfo} {
      visibility: visible;
    }
  }
  &:nth-child(1) > ${StepInfo} {
    left: 0;
    transform: none;
  }
  &:nth-child(${({ numberChild }) => numberChild}) > ${StepInfo} {
    transform: translate(-100%, 0);
    left: 100%;
  }

  &::before {
    content: attr(data-title);
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translate(-50%, 0);
    color: ${({ accomplished, theme }) =>
      accomplished ? theme.colors.accent.light : theme.colors.text.dark};
    width: max-content;
    font-size: ${({ theme }) => theme.size.normal};
    font-weight: ${({ theme }) => theme.weight.bold};
  }
  &::after {
    content: attr(data-content);
    position: absolute;
    bottom: -3.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    color: ${({ accomplished, theme }) =>
      accomplished ? theme.colors.accent.light : theme.colors.text.dark};
    width: max-content;
    font-size: ${({ theme }) => theme.size.normal};
    font-weight: ${({ theme }) => theme.weight.regular};
  }
  &:nth-child(1)::before,
  :nth-child(1)::after {
    left: 0;
    transform: none;
  }
  &:nth-child(${({ numberChild }) => numberChild})::before,
  :nth-child(${({ numberChild }) => numberChild})::after {
    transform: translate(-100%, 0);
    left: 100%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 15px;
    height: 15px;
  }
  ${({ numberChild, theme }) =>
    numberChild > 4
      ? `&::before {
      display: none;
    }
    &::after {
      display: none;
    })`
      : `@media (max-width: ${theme.breakpoint.tablet}) {
    &::before {
      display: none;
    }
    &::after {
      display: none;
    }
  }`};
`;

const BackgroundBar = styled.div<{ progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 10px;
  width: ${({ progress }) =>
    progress >= 100 || progress + 10 >= 100 ? progress : progress + 10}%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.accent.light};
  z-index: -1;
`;

const BoxTablet = styled.div`
  display: flex;
  flex-flow: column nowrap;

  text-align: center;
  margin-top: 15px;
`;

const BoxTabletTitle = styled.p`
  color: ${({ theme }) => theme.colors.accent.light};
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const BoxTabletText = styled.p`
  color: ${({ theme }) => theme.colors.accent.light};
  font-size: ${({ theme }) => theme.size.normal};
  font-weight: ${({ theme }) => theme.weight.regular};
  margin-top: 10px;
`;

export default ProgressBar;
