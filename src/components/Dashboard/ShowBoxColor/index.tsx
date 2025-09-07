import styled from "styled-components";
import Icon from "@components/Layout/Icon";
import useTranslation from "@hooks/useTranslation";
import useBreakpoint from "@hooks/useBreakpoint";

type Options = {
  replace_value: string[];
  isBoolean: boolean;
  transformMobile?: boolean;
};

const DEFAULT_OPTIONS: Options = {
  replace_value: [],
  isBoolean: true,
  transformMobile: false,
};

export const ShowBoxColor = (
  target: number | string | boolean,
  options: Options = DEFAULT_OPTIONS
): any => {
  const { t } = useTranslation("dashboard/common");

  if (options.isBoolean) {
    switch (target) {
      case true:
        return RenderBox(
          options.replace_value[0],
          "green",
          options.transformMobile
        );
      case false:
        return RenderBox(
          options.replace_value[1],
          "red",
          options.transformMobile
        );
      default:
        return undefined;
    }
  } else {
    switch (target) {
      case "paid":
        return RenderBox(t("status.paid"), "green", options.transformMobile);
      case "pending":
        return RenderBox(
          t("status.pending"),
          "yellow",
          options.transformMobile
        );
      case "cancel":
        return RenderBox(t("status.cancel"), "red", options.transformMobile);
      case "completed":
        return RenderBox(
          t("status.completed"),
          "green",
          options.transformMobile
        );
      case "drafted":
        return RenderBox(
          t("status.drafted"),
          "yellow",
          options.transformMobile
        );
      case "cancelled":
        return RenderBox(t("status.cancel"), "red", options.transformMobile);
      case "processing":
        return RenderBox(
          t("status.processing"),
          "blue",
          options.transformMobile
        );
      case "started":
        return RenderBox(t("status.started"), "blue", options.transformMobile);
      case "ended":
        return RenderBox(t("status.ended"), "green", options.transformMobile);
      case "archived":
        return RenderBox(
          t("status.archived"),
          "yellow",
          options.transformMobile
        );
      default:
        return "Undefined";
    }
  }
};

const RenderBox = (
  string: string,
  colorTheme: string,
  transformMobile?: boolean
) => {
  const breakPoint = useBreakpoint();

  let color;
  let background;
  let icon = "";
  switch (colorTheme) {
    case "green":
      color = "hsla(130, 65%, 40%, 1)";
      background = "hsla(130, 65%, 40%, 0.3)";
      icon = "check";
      break;
    case "red":
      color = "hsla(16, 96%, 43%, 1)";
      background = "hsla(16, 96%, 43%, 0.3)";
      icon = "close";
      break;
    case "yellow":
      color = "hsla(36, 100%, 44%, 1)";
      background = "hsla(36, 100%, 44%, 0.3)";
      icon = "loader";
      break;
    case "blue":
      color = "hsla(36, 100%, 44%, 1)";
      background = "hsla(36, 100%, 44%, 0.3)";
      icon = "loader-4";
      break;
  }
  return (
    <>
      <BoxColor color={color} background={background}>
        {transformMobile && breakPoint.isMobile ? (
          <Icon name={icon} size={18} color={color} />
        ) : (
          string
        )}
      </BoxColor>
    </>
  );
};

// TODO change when the theme is update, color and switch
export const BoxColor = styled.div<{ color?: string; background?: string }>`
  border-radius: 5px;
  padding: 3px 9px;
  width: fit-content;
  text-transform: capitalize;
  color: ${({ color }) => color};
  background-color: ${({ background }) => background};
  height: fit-content;
`;
