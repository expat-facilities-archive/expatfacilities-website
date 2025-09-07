import styled from "styled-components";
import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import Button from "@components/Layout/Button";
import useTranslation from "@hooks/useTranslation";
import services from "@data/servicesgrid";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";

const ServiceGrid: React.FC = () => {
  const { t } = useTranslation("servicegrid/common");

  return (
    <Container>
      <Title>{t("title")}</Title>
      <Subtitle>{t("subTitle")}</Subtitle>
      <ServiceCardContainer>
        {services.map((service, i: number) => (
          <ServiceCard key={i} href={service.link}>
            <ServiceIconContainer>{service.icon}</ServiceIconContainer>
            <ServiceText>
              <ServiceCardTitle>{t(service.title)}</ServiceCardTitle>
              <ServiceCardDescription>
                {t(service.description)}
              </ServiceCardDescription>
            </ServiceText>
          </ServiceCard>
        ))}
      </ServiceCardContainer>
      <LinkButton href={ROUTES.SERVICES}>{t("button")}</LinkButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.large};
  }
`;

const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.size.normal};
  margin-top: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.normal};
  }
`;

const ServiceCardContainer = styled.div`
  margin-top: 60px;
  margin-left: -15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin: 15px 0;
  }
`;

const ServiceCard = styled(Link)`
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 15px;
  background: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darker, 0.3)};
  border: 1px solid ${({ theme }) => theme.colors.layout.darker};
  padding: 30px;
  border-radius: 10px;
  width: 25%;
  transition: border 0.2s;
  cursor: pointer;
  user-select: none;

  :hover {
    border: 1px solid ${({ theme }) => theme.colors.accent.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100px;
    height: 100px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
`;

const ServiceIconContainer = styled.div`
  height: auto;
  width: 25%;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 70%;
  }
  svg {
    height: auto;
    width: 80%;
  }
`;

const ServiceText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 75%;
`;

const ServiceCardTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.size.small};
  }
`;

const ServiceCardDescription = styled.p`
  font-size: ${({ theme }) => theme.size.small};
  margin-top: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: none;
  }
`;

const LinkButton = styled(({ children, ...props }) => (
  <Button forwardedAs={Link} {...props}>
    {children}
  </Button>
))`
  margin-top: 30px;
`;

export default ServiceGrid;
