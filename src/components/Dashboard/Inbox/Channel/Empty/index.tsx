import React from "react";
import styled from "styled-components";
import Icon from "@components/Layout/Icon";
import useTranslation from "@hooks/useTranslation";

const ChannelEmpty: React.FC = () => {
  const { t } = useTranslation("dashboard/inbox");

  return (
    <Container>
      <Content>
        <Icon size={50} name="inbox" />
        <Title>{t("no-messages.title")}</Title>
        <Description>{t("no-messages.description")}</Description>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.5;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.text.light};
`;

export default ChannelEmpty;
