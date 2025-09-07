import useTranslation from "@hooks/useTranslation";
import { Service } from "@typeDefs/services";
import styled from "styled-components";
import Card from "./Card";

interface Props {
  data: Service[];
  selectedServices: number[];
  setSelectedServices: React.Dispatch<React.SetStateAction<number[]>>;
}

const PickService: React.FC<Props> = ({
  data,
  selectedServices,
  setSelectedServices,
}: Props) => {
  const { t } = useTranslation("expatriation/country");
  return (
    <Container>
      <Title>{t("details.pickservicequestion")}</Title>
      <List>
        {data.map((service: Service, key: number) => (
          <Card
            key={key}
            data={service}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.weight.medium};
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
  }
`;

export default PickService;
