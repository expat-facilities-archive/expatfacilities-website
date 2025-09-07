import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import Button from "@components/Layout/Button";
import router from "next/router";
import ROUTES from "@constants/routes";
import useBreakpoint from "@hooks/useBreakpoint";

const Header: React.FC = () => {
  const { t } = useTranslation("ambassador/become");
  const { isMobile } = useBreakpoint();

  return (
    <Container>
      <Title>{t("become")}</Title>
      <Description>{t("description")}</Description>
      <BecomeButton
        onClick={() => {
          router.push(
            isMobile
              ? ROUTES.DASHBOARD_ACCOUNT
              : ROUTES.DASHBOARD_ACCOUNT_GENERAL
          );
        }}
      >
        {t("become")}
      </BecomeButton>
    </Container>
  );
};

const Container = styled.section`
  transition: height 0.6s;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
  font-weight: ${({ theme }) => theme.weight.extraBold};
  font-size: ${({ theme }) => theme.size.extraTitle};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const Description = styled.h2`
  margin-top: 15px;
  text-align: center;
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size.medium};
`;

const BecomeButton = styled(Button)`
  margin-top: 45px;
`;

export default Header;
