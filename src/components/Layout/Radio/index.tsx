import React from "react";
import styled from "styled-components";

interface Props {
  value: string | null;
  setValue: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  required?: boolean;
}

const Radio: React.FC<Props> = ({
  value,
  setValue,
  options,
  required,
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Container role="radiogroup">
      {options.map(({ label, value: value1 }, index: number) => (
        <RadioLabel key={index}>
          <label>
            {label}
            <RadioButton
              type="radio"
              key={value}
              checked={value === value1}
              onChange={handleChange}
              value={value1}
              required={required}
            />
            <Fill />
          </label>
        </RadioLabel>
      ))}
    </Container>
  );
};

const Container = styled.div``;

const RadioLabel = styled.div`
  position: relative;
  margin: 5px;
  cursor: pointer;
  width: 20px;
  height: 20px;

  label {
    margin-left: 25px;
    cursor: pointer;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    z-index: 0;
    border-radius: 100%;
    border: 1px solid ${({ theme }) => theme.colors.layout.darker};
    background-color: ${({ theme }) => theme.colors.layout.dark};
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    pointer-events: none;
  }
`;

const Fill = styled.div`
  background-color: ${({ theme }) => theme.colors.accent.light};
  width: 0;
  height: 0;
  border-radius: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s ease-in, height 0.2s ease-in;
  pointer-events: none;
  z-index: 1;

  &::before {
    content: "";
    opacity: 0;
    width: calc(20px - 4px);
    height: calc(20px - 4px);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
    border-radius: 100%;
  }
`;

const RadioButton = styled.input.attrs({
  type: "radio",
})`
  margin: 0;
  opacity: 0;
  position: absolute;
  z-index: 2;
  cursor: pointer;
  top: 0;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;
  }

  &:checked {
    & ~ ${Fill} {
      width: calc(100% - 8px);
      height: calc(100% - 8px);
      transition: width 0.2s ease-out, height 0.2s ease-out;

      &::before {
        opacity: 1;
        transition: opacity 1s ease;
      }
    }
  }
`;

export default Radio;
