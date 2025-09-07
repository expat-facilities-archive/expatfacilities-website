import styled from "styled-components";
import Image from "@components/Image";

import useTranslation from "@hooks/useTranslation";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";

import { YourAmbassador } from "@data/ambassadors";
import Icon from "@components/Layout/Icon";
import LINKS from "@constants/links";

interface Props {
  yourAmbassadors: YourAmbassador[];
}
interface CardProps {
  reversed: boolean;
}

const YourAmbassadors: React.FC<Props> = ({ yourAmbassadors }: Props) => {
  const { t } = useTranslation("ambassador/common");
  const { t: Tdetail } = useTranslation("ambassador/ambassadordetail");

  return (
    <Container>
      <ContainerText>
        <Title>{t("yourAmbassador.title")}</Title>
        <SubTitle>{t("yourAmbassador.subtitle")}</SubTitle>
      </ContainerText>
      {/* TODO: add ambassador searchbar */}
      <CardsContainer>
        {/* TODO: Reverse card 1 sur 2  */}
        {yourAmbassadors.map((yourAmbassador, i) => (
          <Card key={i} reversed={i % 2 == 1}>
            <CardLeft>
              <Thumbnail
                src={yourAmbassador.thumbnailUrl}
                alt={yourAmbassador.name}
                width={270}
                height={270}
              />
            </CardLeft>
            <CardRight>
              <CardTitle>{Tdetail(yourAmbassador.name)}</CardTitle>
              <CardText>{Tdetail(yourAmbassador.text)}</CardText>
              <CardSocials>
                <LinkSocialIcon target="blank" href={LINKS.TWITTER}>
                  <Icon name={"twitter"} fill />
                </LinkSocialIcon>
              </CardSocials>
            </CardRight>
          </Card>
        ))}
      </CardsContainer>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 60%;
  margin: 0 auto;
  margin-top: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 100%;
  }
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
  margin-top: 10px;
`;

const ContainerText = styled.div`
  text-align: center;
`;

const CardsContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
`;

const Card = styled.div`
  display: flex;

  flex-direction: ${(props: CardProps) =>
    props.reversed ? "row-reverse" : "row"};
  border-radius: 10px;
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darker, 0.5)};
  margin-top: 20px;
  padding: 15px;

  :first-child {
    margin-top: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    flex-direction: column;
    text-align: center;
  }
`;

const CardLeft = styled.div`
  display: flex;
  justify-content: center;
`;

const Thumbnail = styled(Image)`
  border-radius: 10px;
  object-fit: cover;
`;

const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    padding: 15px;
  }
`;

const CardTitle = styled.span`
  font-size: ${({ theme }) => theme.size.large};
  font-weight: ${({ theme }) => theme.weight.bold};

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    margin-top: 15px;
  }
`;

const CardText = styled.span`
  text-align: justify;
  margin-top: 15px;
`;

const CardSocials = styled.div`
  margin-top: 15px;
`;
const LinkSocialIcon = styled.a`
  margin-right: 30px;
  :hover {
    color: red;
    cursor: pointer;
  }
  :last-child {
    margin-right: 0;
  }
`;
export default YourAmbassadors;
