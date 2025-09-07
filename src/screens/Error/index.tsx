import styled from "styled-components";

import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import Head from "@components/Head";
import { APP_NAME } from "@constants/main";
import LayoutContainer from "@components/Layout/Container";
import useTranslation from "@hooks/useTranslation";
import { NextPage, NextPageContext } from "next";
import Wrapper from "@components/Wrapper";
import NextErrorComponent, { ErrorProps } from "next/error";
import * as Sentry from "@sentry/nextjs";

interface CustomErrorProps extends ErrorProps {
  hasGetInitialPropsRun?: boolean;
  asPath?: string;
  err?: (Error & { statusCode?: number | undefined }) | null | undefined;
}

const Error: NextPage<CustomErrorProps> = ({
  hasGetInitialPropsRun,
  asPath,
  err,
}: CustomErrorProps) => {
  const { t } = useTranslation("error/common");
  const { t: tDashboard } = useTranslation("dashboard/common");

  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }

  if (asPath?.includes(ROUTES.DASHBOARD))
    return (
      <Container>
        <Head title={tDashboard("title")} subtitle={t("title")} />
        <Title>{t("subtitle")}</Title>
        <Description>
          {t("desc")} <Link href={ROUTES.DASHBOARD}>{APP_NAME}</Link>.
        </Description>
      </Container>
    );

  return (
    <Wrapper>
      <Container>
        <Head title={t("title")} />
        <Title>{t("subtitle")}</Title>
        <Description>
          {t("desc")} <Link href={ROUTES.HOME}>{APP_NAME}</Link>.
        </Description>
      </Container>
    </Wrapper>
  );
};

Error.getInitialProps = async (ctx: NextPageContext) => {
  const { res, err, asPath } = ctx;

  const errorInitialProps: CustomErrorProps =
    await NextErrorComponent.getInitialProps(ctx);

  errorInitialProps.hasGetInitialPropsRun = true;
  errorInitialProps.asPath = asPath;
  errorInitialProps.err = err;

  // Returning early because we don't want to log 404 errors to Sentry.
  if (res?.statusCode === 404) {
    return errorInitialProps;
  }

  if (err) {
    Sentry.captureException(err);

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    `_error.js getInitialProps missing data at path: ${asPath}`
  );
  await Sentry.flush(2000);

  return errorInitialProps;
};

const Container = styled(LayoutContainer)`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 60px - 200px);
`;

const Title = styled.h2`
  font-weight: ${({ theme }) => theme.weight.semiBold};
  font-size: ${({ theme }) => theme.size.large};
`;

const Description = styled.h2`
  margin-top: 30px;

  a {
    color: ${({ theme }) => theme.colors.text.lightest};
    font-weight: ${({ theme }) => theme.weight.bold};
  }
`;

export default Error;
