import styled from "styled-components";
import { Country } from "@typeDefs/destinations";
import DestinationList from "./List";
import useTranslation from "@hooks/useTranslation";

interface Props {
  data: Country[];
}

const Expatriation: React.FC<Props> = ({ data }: Props) => {
  const { t } = useTranslation("home/expatriation");
  return (
    <Container>
      <Content>
        <TitleContainer>
          <Title>{t("title")}</Title>
        </TitleContainer>
      </Content>
      <DestinationList data={data} />
    </Container>
  );
};

const Container = styled.div`
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;

const TitleContainer = styled.div`
  padding-left: 15px;
  border-left: 2px solid ${({ theme }) => theme.colors.accent.light};
  line-height: 1.25;
`;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.large};
`;

export default Expatriation;
