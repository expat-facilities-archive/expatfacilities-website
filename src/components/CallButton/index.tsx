import Button from "@components/Layout/Button";
import useTranslation from "@hooks/useTranslation";
import styled from "styled-components";
import Icon from "@components/Layout/Icon";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";
import useBreakpoint from "@hooks/useBreakpoint";

const CallButton: React.FC = () => {
  const { t } = useTranslation("home/common");
  const { pathname } = useRouter();
  const { isMobile } = useBreakpoint();

  return (
    <Container>
      <CButton
        href={"tel:+33 7 56 85 66 85"}
        title={t("callsales")}
        bottom={pathname.includes(ROUTES.EXPATRIATION) && isMobile ? 90 : null}
      >
        <Circle />
        <SalesText>{t("callsales")}</SalesText>
        <PhoneIcon name="phone" fill size={32} />
      </CButton>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const Circle = styled.div`
  background-color: #32cd32;
  border-radius: 100%;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${({ theme }) => theme.colors.accent.white};
`;

const CButton = styled(({ children, ...props }) => (
  <Button as={"a"} {...props}>
    {children}
  </Button>
))<{ bottom?: number }>`
  display: flex;
  width: fit-content;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: ${({ bottom }) => bottom ?? 10}px;
  right: 10px;
  padding: 3px;
  padding-left: 15px;
  border-radius: 50px;
  margin-bottom: 10px;
  margin-right: 10px;
  pointer-events: initial;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 10px 10px;
  }
`;

const PhoneIcon = styled(Icon)`
  border-radius: 100%;
  padding: 8px;
  margin-left: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-left: 0;
  }
`;

const SalesText = styled.span`
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: none;
  }
`;

export default CallButton;
