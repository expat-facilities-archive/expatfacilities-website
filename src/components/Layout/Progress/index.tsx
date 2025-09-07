import React from "react";
import styled from "styled-components";

interface Props {
  value: number;
  max?: number;
  colors?: Record<number, string>;
  states?: Record<number, string | React.ReactNode>;
  checkpoints?: boolean;
}

const Progress: React.FC<Props> = ({
  value,
  max = 100,
  colors,
  states,
  checkpoints,
  ...props
}: Props) => {
  /**
   * colors is a map of numbers to colors
   * if the value is more than the key, the color is returned
   */

  const background = colors
    ? Object.keys(colors)
        .map((key) => parseInt(key))
        .filter((key) => key <= value)
        .map((key) => colors[key])
        .pop()
    : undefined;

  const state = states
    ? Object.keys(states)
        .map((key) => parseInt(key))
        .filter((key) => key <= value)
        .map((key) => states[key])
        .pop()
    : undefined;

  return (
    <Container checkpoints={checkpoints}>
      {/* add all checkpoints */}
      {state && <State>{state}</State>}
      <StyledProgress
        value={value}
        max={max}
        {...props}
        background={background}
      />
      <div>
        {states &&
          Object.keys(states).map((key) => {
            const checkpoint = parseInt(key);
            const active = checkpoint <= value;
            return (
              <Checkpoint
                key={checkpoint}
                value={checkpoint}
                active={active}
                color={active ? background : undefined}
              >
                <CheckpointTitle>{states[checkpoint]}</CheckpointTitle>
              </Checkpoint>
            );
          })}
      </div>
    </Container>
  );
};

const Container = styled.div<{
  checkpoints?: boolean;
}>`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ checkpoints }) => checkpoints && "padding-bottom: 35px;"}
`;

const State = styled.span`
  margin-bottom: 15px;
  font-size: ${({ theme }) => theme.size.small};
  font-style: italic;
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.colors.text.light};
`;

const CheckpointTitle = styled.span`
  opacity: 0;
  position: absolute;
  top: 35px;
  left: 50%;
  font-size: ${({ theme }) => theme.size.small};
  font-style: italic;
  white-space: nowrap;
  color: ${({ theme }) => theme.colors.text.light};
  transform: translateX(-50%);
  transition: all 0.3s ease-in-out;
`;

const Checkpoint = styled.div<{
  value: number;
  active: boolean;
  color?: string;
}>`
  position: absolute;
  top: 24px;
  left: ${({ value }) => `${value}%`};
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: ${({ theme, color }) => color || theme.colors.layout.light};
  z-index: 1;
  transform: translateX(-50%);

  ${CheckpointTitle} {
    ${({ active }) => active && "opacity: 0.9;"};
  }

  :first-child {
    ${CheckpointTitle} {
      transform: translateX(-25%);
    }
  }

  :last-child {
    ${CheckpointTitle} {
      transform: translateX(-75%);
    }
  }

  :hover {
    ${CheckpointTitle} {
      opacity: 1;
    }
  }
`;

const StyledProgress = styled.progress<{
  background?: string;
}>`
  appearance: none;
  border: none;
  height: 10px;
  display: block;
  vertical-align: unset;
  width: 100%;

  ::-webkit-progress-bar {
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.layout.dark};
  }

  ::-webkit-progress-value {
    border-radius: 5px;
    background: ${({ theme, background }) =>
      background || theme.colors.layout.lightest};
    transition: all 0.1s ease-in-out;
  }
`;

export default Progress;
