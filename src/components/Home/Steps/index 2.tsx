import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import Image from "@components/Image";

const Steps: React.FC = () => {
  const { t } = useTranslation("home/steps");

  return (
    <Container>
      <Text>
        <Title>{t("title")}</Title>
        <Subtitle>{t("subtitle")}</Subtitle>
      </Text>
      <CardsContainer>
        <Card>
          <CardLeft>
            <CardImage
              src={"/static/images/home/steps/step-1.jpg"}
              alt={"Destination"}
              width={120}
              height={120}
            />
          </CardLeft>

          <CardRight>
            <CardTitle>{t("destination.title")}</CardTitle>
            <CardDescription>{t("destination.description")}</CardDescription>
            <StepIndicator>1</StepIndicator>
          </CardRight>
        </Card>

        <Card>
          <CardLeft>
            <CardImage
              src={"/static/images/home/steps/step-2.jpg"}
              alt={"Destination"}
              width={120}
              height={120}
            />
          </CardLeft>

          <CardRight>
            <CardTitle>{t("services.title")}</CardTitle>
            <CardDescription>{t("services.description")}</CardDescription>
            <StepIndicator>2</StepIndicator>
          </CardRight>
        </Card>

        <Card>
          <CardLeft>
            <CardImage
              src={"/static/images/home/steps/step-3.jpg"}
              alt={"Destination"}
              width={120}
              height={120}
            />
          </CardLeft>

          <CardRight>
            <CardTitle>{t("cart.title")}</CardTitle>
            <CardDescription>{t("cart.description")}</CardDescription>
            <StepIndicator>3</StepIndicator>
          </CardRight>
        </Card>

        <Card>
          <CardLeft>
            <CardImage
              src={"/static/images/home/steps/step-4.jpg"}
              alt={"Destination"}
              width={120}
              height={120}
            />
          </CardLeft>

          <CardRight>
            <CardTitle>{t("trip.title")}</CardTitle>
            <CardDescription>{t("trip.description")}</CardDescription>
            <StepIndicator>4</StepIndicator>
          </CardRight>
        </Card>

        <Card>
          <CardLeft>
            <CardImage
              src={"/static/images/home/steps/step-5.jpg"}
              alt={"Destination"}
              width={120}
              height={120}
            />
          </CardLeft>

          <CardRight>
            <CardTitle>{t("documents.title")}</CardTitle>
            <CardDescription>{t("documents.description")}</CardDescription>
            <StepIndicator>5</StepIndicator>
          </CardRight>
        </Card>
        <Break></Break>
        <LastCard>
          <CardLeft>
            <CardImage
              src={"/static/images/home/steps/step-6.jpg"}
              alt={"Destination"}
              width={120}
              height={120}
            />
          </CardLeft>

          <CardRight>
            <CardTitle>{t("enjoy.title")}</CardTitle>
            <CardDescription>{t("enjoy.description")}</CardDescription>
            <StepIndicator>6</StepIndicator>
          </CardRight>
        </LastCard>
      </CardsContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  margin: 60px auto 0;
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

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Card = styled.div`
  position: relative;
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.dark, 0.3)};
  border-radius: 10px;
  padding: 30px 40px;
  width: 40%;
  display: flex;
  margin-top: 40px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const CardLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardImage = styled(Image)`
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100px;
    height: 100px;
  }
`;

const CardRight = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 30px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 70%;
    margin-left: 25px;
  }
`;

const CardTitle = styled.div`
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const CardDescription = styled.div`
  font-size: ${({ theme }) => theme.size.normal};
  line-height: 18.75px;
  margin-top: 10px;
`;

const StepIndicator = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: ${({ theme }) => theme.colors.accent.dark};
  width: 42px;
  height: 42px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.size.medium};
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.colors.text.light};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 32px;
    height: 32px;
  }
`;

const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;

const LastCard = styled(Card)`
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.accent.dark, 0.6)};
`;

export default Steps;
