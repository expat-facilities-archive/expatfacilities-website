import styled from "styled-components";
import useTranslation from "@hooks/useTranslation";
import Button from "@components/Layout/Button";
import router from "next/router";
import ROUTES from "@constants/routes";

const Header: React.FC = () => {
  const { t } = useTranslation("ambassador/common");

  return (
    <Container>
      <Title>{t("title")}</Title>
      <Description>{t("subtitle")}</Description>
      <BecomeButton
        onClick={() => {
          router.push(ROUTES.BECOME_AMBASSADOR);
        }}
      >
        {t("becomeAmbassador")}
      </BecomeButton>
    </Container>
  );
};

const Title = styled.h1`
  text-align: center;
  font-weight: ${({ theme }) => theme.weight.extraBold};
  font-size: ${({ theme }) => theme.size.extraTitle};
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const Description = styled.h2`
  margin-top: 10px;
  text-align: center;
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size.medium};
`;

const BecomeButton = styled(Button)`
  margin-top: 45px;
`;

const Container = styled.section`
  transition: height 0.6s;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    transition: height 0.5s;
    height: 55vh;
  }
`;

export default Header;
