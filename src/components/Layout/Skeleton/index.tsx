import isString from "@utils/isString";
import React from "react";
import styled from "styled-components";

interface Props {
  show?: boolean;
  width?: number | string;
  height?: number | string;
  boxHeight?: number;
  left?: boolean;
  right?: boolean;
  shape?: "normal" | "square" | "round";
  children?: React.ReactNode;
  [key: string]: any;
}

const Skeleton = React.forwardRef<HTMLSpanElement, Props>(
  ({ children, width, height, show = true, ...rest }, ref): JSX.Element => {
    if (!show && !children) return <></>;
    if (!show && children) return children as JSX.Element;

    return (
      <Container width={width} height={height} show={show} {...rest} ref={ref}>
        {children}
      </Container>
    );
  }
);

Skeleton.displayName = "Skeleton";

const Container = styled.span<Props>`
  ${({ children, show = true, width, height, shape, theme }) =>
    children
      ? `
        position: relative;
        display: block;
        width: ${width ? "100%" : "auto"};
        max-width: ${
          width ? (isString(width) ? width : `${width}px`) : "unset"
        };
        min-height: ${
          height ? (isString(height) ? height : `${height}px`) : "auto"
        };
        ${
          show
            ? `
            ::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              z-index: 100;
              user-select: none;
              cursor: default;
              border-radius: ${
                shape === "square"
                  ? "0"
                  : shape === "round"
                  ? "99999px"
                  : "10px"
              };
              background-image: linear-gradient(
                270deg,
                ${theme.colors.layout.darkest},
                ${theme.colors.layout.dark},
                ${theme.colors.layout.dark},
                ${theme.colors.layout.darkest}
              );
              background-size: 400% 100%;
              animation: skeleton 8s ease-in-out infinite;
            }
        `
            : ""
        }
      `
      : `
          display: block;
          width: 100%;
          user-select: none;
          cursor: default;
          max-width: ${
            width ? (isString(width) ? width : `${width}px`) : "24px"
          };
          min-height: ${
            height ? (isString(height) ? height : `${height}px`) : "24px"
          };
          border-radius: ${
            shape === "square" ? "0" : shape === "round" ? "99999px" : "10px"
          };
          background-size: 400% 100%;
          background-image: linear-gradient(
            270deg,
            ${theme.colors.layout.darkest},
            ${theme.colors.layout.dark},
            ${theme.colors.layout.dark},
            ${theme.colors.layout.darkest}
          );
          animation: skeleton 8s ease-in-out infinite;
  `}

  ${({ boxHeight, height }) =>
    boxHeight &&
    Number.isFinite(height) &&
    boxHeight - ((height as number) || 24) > 0 &&
    `margin-bottom: ${boxHeight - ((height as number) || 24)}px`};

  @keyframes skeleton {
    0% {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }
`;

export default Skeleton;
