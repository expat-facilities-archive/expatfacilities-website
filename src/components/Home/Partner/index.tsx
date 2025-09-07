import styled from "styled-components";
import PartnerList from "./List";
import partners from "@data/partners";
import useTranslation from "@hooks/useTranslation";

const Partner: React.FC = () => {
  const { t } = useTranslation("home/partner");
  return (
    <Container>
      <Text>
        <Title>{t("title")}</Title>
        <Subtitle>{t("subtitle")}</Subtitle>
      </Text>
      <PartnerList data={partners} />
    </Container>
  );
};

const Container = styled.div`
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  user-select: none;
  align-items: center;
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

export default Partner;
