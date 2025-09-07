import List from "@components/About/FastFacts/List";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";

const FastFacts: React.FC = () => {
  const { t } = useTranslation("about/fastfacts");
  return (
    <Container>
      <TitleContainer>
        <Title>{t("title")}</Title>
      </TitleContainer>
      <List />
    </Container>
  );
};

const Container = styled.div`
  margin: 120px auto 0;
  display: flex;
  flex-direction: column;
`;

const TitleContainer = styled.div`
  margin: 0 auto;
`;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.large};
`;

export default FastFacts;
