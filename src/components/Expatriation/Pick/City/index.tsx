import Button from "@components/Layout/Button";
import useTranslation from "@hooks/useTranslation";
import { City } from "@typeDefs/destinations";
import styled from "styled-components";

interface Props {
  data: City[];
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
}

const PickCity: React.FC<Props> = ({
  data,
  selectedCity,
  setSelectedCity,
}: Props) => {
  const { t } = useTranslation("expatriation/country");
  return (
    <Container>
      <Title>{t("details.pickcityquestion")}</Title>
      <List>
        {data.map((city: City, i: number) => (
          <Card
            key={i}
            mode={"darker"}
            onClick={() => {
              setSelectedCity(city);
            }}
            active={selectedCity?.id === city.id}
          >
            {city.name}
          </Card>
        ))}
      </List>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.medium};
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
`;

const Card = styled(Button)<{ active: boolean }>`
  position: relative;
  width: calc(15% - 30px);
  height: 50px;
  margin-top: 15px;
  margin-left: 15px;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s;
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.accent.light : "rgba(168,179,207,0.2)"};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: calc(33.3% - 30px);
  }
`;

export default PickCity;
