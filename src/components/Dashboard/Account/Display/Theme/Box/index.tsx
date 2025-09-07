import { GlobalThemeContext } from "@context/GlobalTheme";
import { Theme } from "@typeDefs/themes";
import capitalize from "@utils/capitalize";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import React from "react";
import styled from "styled-components";

interface Props {
  theme: Theme;
}

const Box: React.FC<Props> = ({ theme }: Props) => {
  const { setGlobalTheme } = React.useContext(GlobalThemeContext);
  const handleClick = () => {
    localStorage.setItem("theme", theme.id.toString());
    setGlobalTheme(theme);
  };

  return (
    <Container onClick={handleClick}>
      <Palette currentTheme={theme}>
        <span>{capitalize(theme.name)}</span>
      </Palette>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;

  :first-child {
    margin-left: 0;
  }
`;

const Palette = styled.div<{ currentTheme: Theme }>`
  background-color: ${({ currentTheme }) => currentTheme.colors.layout.darkest};
  height: 20px;
  width: 20px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.layout.dark};
  position: relative;
  span {
    display: none;
    white-space: nowrap;
  }

  :hover {
    span {
      position: absolute;
      display: inline-block;
      bottom: -50px;
      border-radius: 5px;
      padding: 10px 14px;
      background-color: ${({ theme }) =>
        convertRGBToRGBA(theme.colors.layout.darker, 0.8)};
      color: ${({ theme }) => theme.colors.text.lightest};
      animation-duration: 1s;
      animation-fill-mode: both;
      animation-name: fadeIn;

      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }
`;

export default Box;
