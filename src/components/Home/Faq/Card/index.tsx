import React from "react";
import { Questions } from "@typeDefs/questions";
import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import Collapse from "@components/Layout/Collapse";
import Icon from "@components/Layout/Icon";

interface Props {
  data: Questions;
}

const Card: React.FC<Props> = ({ data: { question, answer } }: Props) => {
  const { t } = useTranslation("data/questions");

  return (
    <Container card title={t(question)}>
      {t(answer)}
    </Container>
  );
};

const Container = styled(Collapse)`
  transition: all 0.5s;

  :hover {
    border-color: ${({ theme }) => theme.colors.accent.light};
    ${Icon} {
      transition: all 0.5s;
      color: ${({ theme }) => theme.colors.accent.light};
    }
  }
`;

export default Card;
