import { useStaticMutation } from "@hooks/useStaticQuery";
import { DashboardButton } from "@components/Layout/Dashboard";
import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import { SEND_VERIFICATION, VERIFY_USER } from "@queries/auth";
import styled from "styled-components";
import { useRouter } from "next/router";
import React from "react";
import openMailbox from "@utils/openMailbox";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import useTranslation from "@hooks/useTranslation";
import Icon from "@components/Layout/Icon";

interface Props {
  email: string;
}

const EmailConfirm: React.FC<Props> = ({ email }: Props) => {
  const router = useRouter();

  const [verification] = React.useState(false);

  const [handleResend, { loading }] = useStaticMutation(SEND_VERIFICATION);
  const [handleVerify] = useStaticMutation(VERIFY_USER);

  const handleResendCallback = async () => {
    await handleResend({
      variables: {},
    });
  };

  const handleMailbox = () => {
    openMailbox(email);
  };

  const { t } = useTranslation("dashboard/overview");

  if (verification) {
    return (
      <Container>
        <Content>
          {t("emailconfirm.success")}
          <ButtonsContainer>
            <CloseButton href={ROUTES.DASHBOARD} mode={"darker"}>
              {t("emailconfirm.close")}
            </CloseButton>
          </ButtonsContainer>
        </Content>
      </Container>
    );
  }

  if (router.query.verify && !verification) {
    handleVerify({
      variables: {
        token: router.query?.verify as string,
      },
    });
    return (
      <Container>
        <Content>{t("emailconfirm.verifying")}</Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <TextContainer>
          {t("emailconfirm.click")}
          <EmailContainer href={ROUTES.DASHBOARD_ACCOUNT}>
            <Email>{email}</Email>
            <Icon name={"pencil"} />
          </EmailContainer>
        </TextContainer>
        <ButtonsContainer>
          <MailButton onClick={handleMailbox}>
            {t("emailconfirm.mailbox")}
          </MailButton>
          <MailButton
            mode={"darker"}
            onClick={handleResendCallback}
            loading={loading}
          >
            {t("emailconfirm.resend")}
          </MailButton>
        </ButtonsContainer>
      </Content>
      <Description>
        <DescriptionIcon name={"lightbulb"} />
        {t("emailconfirm.spam")}
      </Description>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Content = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.accent.light};
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.accent.light, 0.1)};
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  box-sizing: border-box;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    flex-direction: column;
  }
`;
const TextContainer = styled.p``;

const Description = styled.p`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.size.small};
  color: ${({ theme }) => theme.colors.text.light};
`;

const DescriptionIcon = styled(Icon)`
  margin-right: 5px;
`;

const EmailContainer = styled(Link)`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.accent.light};
  border-bottom: solid 1px ${({ theme }) => theme.colors.accent.light};
  margin-left: 3px;
`;

const Email = styled.span`
  font-weight: ${({ theme }) => theme.weight.medium};
`;

const ButtonsContainer = styled.div`
  display: flex;
  margin-left: auto;
  @media (max-width: ${({ theme }) => theme.breakpoint.laptop}) {
    margin-top: 15px;
    margin-left: 0;
  }
`;

const MailButton = styled(DashboardButton)`
  margin-right: 10px;
  :last-child {
    margin-right: 0;
  }
`;

const CloseButton = styled(({ children, ...props }) => (
  <DashboardButton forwardedAs={Link} {...props}>
    {children}
  </DashboardButton>
))<{ backgroundColor: string }>``;

export default EmailConfirm;
