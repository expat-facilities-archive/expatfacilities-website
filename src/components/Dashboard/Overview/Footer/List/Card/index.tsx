import { DashboardButton } from "@components/Layout/Dashboard";
import Link from "@components/Layout/Link";
import React from "react";
import styled from "styled-components";

interface Props {
  link: string;
  emoji: string;
  title: string;
}

const Card: React.FC<Props> = ({ link, emoji, title }: Props) => {
  return (
    <Container href={link}>
      <Button mode={"darker"}>
        <Title>{`${emoji} ${title}`}</Title>
      </Button>
    </Container>
  );
};

const Container = styled(Link)`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;

const Button = styled(DashboardButton)`
  padding: 1rem 2rem;
  width: 100%;
`;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.weight.medium};
`;

export default Card;
