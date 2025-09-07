import React from "react";

import styled from "styled-components";

enum LabelType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
}

type Props = {
  type: LabelType;
  content: string;
  className?: string;
};

const DashboardLabel: React.FC<Props> = ({
  type,
  content,
  className,
}: Props) => {
  return (
    <Container type={type} className={className}>
      <Content>{content}</Content>
    </Container>
  );
};

const Container = styled.div<{ type: string }>`
  user-select: none;
  background-color: ${({ type, theme }) =>
    ({
      [LabelType.PRIMARY]: theme.colors.accent.light,
      [LabelType.SECONDARY]: "#6c757d",
      [LabelType.SUCCESS]: "#28a745",
      [LabelType.DANGER]: "#dc3545",
      [LabelType.WARNING]: "#ffc107",
      [LabelType.INFO]: "#17a2b8",
      [LabelType.LIGHT]: "#f8f9fa",
      [LabelType.DARK]: "#343a40",
    }[type])};
  border-radius: 0.25rem;
  color: ${({ type, theme }) =>
    type === LabelType.LIGHT
      ? theme.colors.text.darkest
      : theme.colors.text.lightest};
  display: inline-block;
  line-height: 1.5;
  padding: 1px 5px;
  text-align: center;
  white-space: nowrap;
  height: fit-content;
  width: fit-content;
`;

const Content = styled.span``;

export { LabelType };
export default DashboardLabel;
