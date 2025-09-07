import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import Image from "@components/Image";
import { APP_NAME } from "@constants/main";

const Promotion: React.FC = () => {
  const { t } = useTranslation("dashboard/overview");
  return (
    <Container>
      <Title>
        <Icon
          src={"/static/images/logo/logo.svg"}
          alt={`Logo ${APP_NAME}`}
          width={40}
          height={40}
        />
        {t("promotion.title")}
      </Title>
      <Subtitle>{t("promotion.subtitle")}</Subtitle>
      <Description>{t("promotion.description")}</Description>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  border-radius: 10px;
  min-height: 175px;
  background-image: url("/static/images/dashboard/promotion.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 15px;
  padding: 15px;
  color: ${({ theme }) => theme.colors.accent.black};
  border: 1px solid ${({ theme }) => theme.colors.layout.light};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    min-height: 160px;
  }
`;

const Title = styled.small`
  font-size: ${({ theme }) => theme.size.normal};
  display: flex;
  align-items: center;
`;

const Icon = styled(Image)`
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

const Subtitle = styled.h2`
  font-size: ${({ theme }) => theme.size.extraTitle};
  font-weight: ${({ theme }) => theme.weight.extraBold};
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    line-height: 33px;
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.size.normal};
`;

export default Promotion;
