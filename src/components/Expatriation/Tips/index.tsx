import Button from "@components/Layout/Button";
import Link from "@components/Layout/Link";
import styled from "styled-components";

const DestinationCountryTips: React.FC = () => {
  return (
    <Container>
      <TextCol>
        <Title>Les Tips</Title>
        <Description>
          {
            "Le pays du soleil levant est une destination fortement recommandée pour les étudiants souhaitant s’expatrier. Il est le 8e pays à accueillir le plus d’étudiants internationaux. Le Japon te fera grandir, sortir de ta zone de confort, tout te sera inconnu,mais aussi bénéfique et tu risquerais même de t'y installer!"
          }
        </Description>
        <DiscoverButton href="#">{"Découvrir les Tips"}</DiscoverButton>
      </TextCol>
      <ThumbnailCol>
        <ThumbnailImage src={"/static/images/tips.png"} alt="" />
      </ThumbnailCol>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
`;

const TextCol = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ThumbnailCol = styled.div`
  width: 60%;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Description = styled.p`
  margin-top: 30px;
  line-height: 1.5;
`;

const ThumbnailImage = styled.img`
  transform: scale(0.8);
`;

const DiscoverButton = styled(({ children, ...props }) => (
  <Button forwardedAs={Link} {...props}>
    {children}
  </Button>
))`
  margin-top: 30px;
`;

export default DestinationCountryTips;
