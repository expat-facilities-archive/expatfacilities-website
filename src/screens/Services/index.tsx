import { NextPage } from "next";
import Wrapper from "@components/Wrapper";
import LayoutMain from "@components/Layout/Main";
import LayoutContainer from "@components/Layout/Container";
import Head from "@components/Head";
import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import Background from "@components/Background";
import ServicesList from "@components/Service/List";

const Services: NextPage = () => {
  const { t } = useTranslation("service/common");

  return (
    <Wrapper>
      <LayoutMain>
        <Head title={t("head.title")} description={t("head.description")} />
        <LayoutContainer>
          <Background src={"/static/images/backgrounds/services.jpg"} />
          <Title>{t("title")}</Title>
          <SubTitle>{t("subtitle")}</SubTitle>
          <ServicesList />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.extraTitle};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const SubTitle = styled.p`
  margin-top: 15px;
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size};
  text-align: center;
`;

export default Services;
