import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import Searchbar from "./Searchbar";
import { APP_NAME } from "@constants/main";

const Featured: React.FC = () => {
  const { t } = useTranslation("home/featured");
  return (
    <Container>
      <Header>
        <Title>{APP_NAME}</Title>
        <SubTitle>{t("header.subtitle")}</SubTitle>
        <Description>{t("header.description")}</Description>
      </Header>
      <Searchbar />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 768px;
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.extraTitle};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const SubTitle = styled.h2`
  font-weight: ${({ theme }) => theme.weight.extraBold};
  font-size: ${({ theme }) => theme.size.title};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const Description = styled.h2`
  font-size: ${({ theme }) => theme.size.medium};
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.text.lighter};
`;

export default Featured;
