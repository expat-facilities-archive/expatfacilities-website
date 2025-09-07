import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface Props {
  title: string;
  url: string;
}

const AccountSidebarItem: React.FC<Props> = ({ title, url }: Props) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault();
    router.push(url);
  };

  return (
    <Container onClick={handleClick} active={router.pathname === url}>
      <Content>
        <Title>{title}</Title>
      </Content>
    </Container>
  );
};

const Container = styled.li<{ active: boolean }>`
  display: flex;
  padding: 10px;
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  ${({ theme, active }) =>
    active &&
    `
    background-color: ${theme.colors.layout.darker};
    border-right: 3px solid ${theme.colors.layout.dark};`};

  :hover {
    background-color: ${({ theme }) => theme.colors.layout.darker};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;
  line-height: 1.2;
`;

const Title = styled.p``;

export default AccountSidebarItem;
