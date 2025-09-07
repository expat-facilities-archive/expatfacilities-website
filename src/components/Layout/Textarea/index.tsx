import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import styled from "styled-components";

interface Props {
  disabled?: boolean;
  error?: boolean;
  border?: string;
  background?: string;
}

const Textarea = styled.textarea<Props>`
  outline: none;
  border: 1px solid
    ${({ theme, error, border }) =>
      error
        ? theme.colors.accent.red
        : border
        ? border
        : theme.colors.layout.dark};
  background-color: ${({ theme, disabled, background }) =>
    disabled
      ? convertRGBToRGBA(
          background ? background : theme.colors.layout.darker,
          0.5
        )
      : background
      ? background
      : theme.colors.layout.darker};
  border-radius: 5px;
  width: 100%;
  padding: 10px 12px;
  resize: none;
  color: ${({ theme, error }) =>
    error ? theme.colors.accent.red : theme.colors.text.lightest};
  font-size: ${({ theme }) => theme.size.normal};
  transition: all 0.2s;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
  box-sizing: border-box;
  :focus {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.accent.red : theme.colors.accent.light};
  }

  ::placeholder {
    color: ${({ theme }) => theme.colors.text.dark};
  }
`;

export default Textarea;
