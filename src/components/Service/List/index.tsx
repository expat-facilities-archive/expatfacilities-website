import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import services from "@data/servicesList";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import Collapse from "@components/Layout/Collapse";
import useBreakpoint from "@hooks/useBreakpoint";

interface Props {
  reversed: boolean;
}

const ServicesList: React.FC = () => {
  const { t } = useTranslation("service/common");
  const { isMobile } = useBreakpoint();
  return (
    <Container>
      <Title>{t("list.title")}</Title>
      <SubTitle>{t("list.subtitle")}</SubTitle>
      {services.map((service, i) => (
        <Card key={i} reversed={i % 2 != 0}>
          {isMobile ? (
            <CardTextCollapse card={false} title={t(service.name)}>
              {service.text.map((text, j) => (
                <Text key={j}>{t(text)}</Text>
              ))}
            </CardTextCollapse>
          ) : (
            <>
              <CardText>
                <CardTitle>{t(service.name)}</CardTitle>
                {service.text.map((text, j) => (
                  <Text key={j}>{t(text)}</Text>
                ))}
              </CardText>
            </>
          )}
          <CardIcon>
            <ServiceIcon>{service.icon}</ServiceIcon>
          </CardIcon>
        </Card>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 240px;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.medium};
    width: 100%;
    flex-direction: column-reverse;
  }
`;

const SubTitle = styled.span`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.size.normal};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.small};
    margin-top: 10px;
  }
`;

const Card = styled.div`
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darker, 0.3)};
  display: flex;
  flex-direction: ${(props: Props) => (props.reversed ? "row-reverse" : "row")};
  margin-top: 30px;
  padding: 30px 15px;
  justify-content: space-between;
  border-radius: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: calc(100% - 15px * 2);
    flex-direction: column-reverse;
  }
`;

const CardText = styled.div`
  width: 85%;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
  }
`;

const CardTextCollapse = styled(Collapse)`
  margin-top: 25px;
  border: none !important;
`;

const CardIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    text-align: unset;
    width: 100%;
  }
`;

const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  width: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 20px;
    text-align: center;
  }
`;

const Text = styled.p`
  margin-top: 20px;
  font-size: ${({ theme }) => theme.size.normal};
`;

const ServiceIcon = styled.div`
  height: auto;
  width: 50%;
  svg {
    height: auto;
    width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 40%;
    display: flex;
    justify-content: center;
  }
`;

export default ServicesList;
