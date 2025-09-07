import styled from "styled-components";
import ReactTooltip from "react-tooltip";

interface Props {
  size?: "small" | "normal";
  mode?: "green" | "blue" | "red" | "yellow" | "white" | "outline";
  tooltip?: string;
  children: string | number;
}

const Badge = styled(({ children, tooltip, ...props }: Props) => {
  const text: string = children.toString();

  return (
    <>
      <ReactTooltip place={"top"} effect={"solid"} />
      <span data-tip={tooltip} {...props}>
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </span>
    </>
  );
})<Props>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  white-space: nowrap;
  padding: 0 10px;
  font-weight: ${({ theme }) => theme.weight.medium};
  border-radius: 5px;

  font-size: ${({ theme, size }) => {
    switch (size) {
      case "small":
        return theme.size.small;
      default:
        return theme.size.normal;
    }
  }};

  height: ${({ size }) => {
    switch (size) {
      case "small":
        return "20px";
      default:
        return "30px";
    }
  }};

  color: ${({ theme, mode }) => {
    switch (mode) {
      case "white":
        return theme.colors.accent.black;
      case "outline":
        return theme.colors.text.lightest;
      default:
        return theme.colors.accent.white;
    }
  }};

  background-color: ${({ theme, mode }) => {
    switch (mode) {
      case "green":
        return theme.colors.accent.green;
      case "blue":
        return theme.colors.accent.blue;
      case "red":
        return theme.colors.accent.red;
      case "yellow":
        return theme.colors.accent.yellow;
      case "white":
        return theme.colors.accent.white;
      case "outline":
        return "transparent";
      default:
        return theme.colors.accent.light;
    }
  }};

  // if mode outline border layout lightest
  border: ${({ theme, mode }) => {
    switch (mode) {
      case "outline":
        return `1px solid ${theme.colors.text.lightest}`;
      default:
        return "none";
    }
  }};
`;

export default Badge;
