import useTranslation from "@hooks/useTranslation";
import { Questions } from "@typeDefs/questions";
import styled from "styled-components";
import Card from "./Card";

interface Props {
  data: Questions[];
}

const PickQuestion: React.FC<Props> = ({ data }: Props) => {
  const { t } = useTranslation("data/questions");
  return (
    <Container>
      <Text>
        <Title>{t("title")}</Title>
        <Subtitle>{t("subtitle")}</Subtitle>
      </Text>
      <List>
        {data.map((question: Questions, key: number) => (
          <Card key={key} data={question} />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  margin: 60px auto 0;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Subtitle = styled.p`
  font-weight: ${({ theme }) => theme.weight.medium};
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 120px;
  margin-top: 25px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    padding: 0;
  }
`;

export default PickQuestion;
