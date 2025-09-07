import { NextPage } from "next";
import Wrapper from "@components/Wrapper";
import LayoutMain from "@components/Layout/Main";
import LayoutContainer from "@components/Layout/Container";
import Head from "@components/Head";
import styled from "styled-components";
import { APP_NAME } from "@constants/main";
import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import CookieSection from "@components/Settings/Cookie/Section";
import CookieSectionRequired from "@components/Settings/Cookie/Section/Required";
import useTranslation from "@hooks/useTranslation";

const Cookie: NextPage = () => {
  const { t } = useTranslation("cookie/common");
  return (
    <Wrapper>
      <LayoutMain>
        <Head
          title={"Settings"}
          subtitle={"Cookie"}
          description={t("head.description")}
        />
        <LayoutContainer>
          <Container>
            <Title>{"Cookie settings"}</Title>
            <Description>
              {`${APP_NAME} uses cookies to improve your experience and for marketing. Review and manage your cookie settings below to control your privacy. For more information on how we use cookies, please see`}{" "}
              <Link href={ROUTES.PRIVACY}>{`${APP_NAME} privacy policy`}</Link>
              {"."}
            </Description>
            <CookieWrapper>
              <CookieSection
                title={"Preferences"}
                name={"preferences"}
                description={
                  "Preference cookies let us save your preferences and recognize you when you return to our Services."
                }
              />
              <CookieSection
                title={"Advertising"}
                name={"advertising"}
                description={
                  "Advertising cookies and similar technologies on expatfacilities.co allow us to place targeted advertisements on other sites you visit and measure your engagement with those ads."
                }
              />
              <CookieSection
                title={"Analytics"}
                name={"analytics"}
                description={
                  "Analytics cookies help us understand how visitors interact with our Services, allowing us to analyze and improve our Services (also through third party analytics)."
                }
              />
              <CookieSectionRequired
                title={"Authentication"}
                description={`Authentication cookies enable ${APP_NAME} to remember you so you don’t have to log in as you use our Services.`}
              />
              <CookieSectionRequired
                title={"Functionality"}
                description={
                  "Functionality cookies are used to keep our Site and Services working correctly, like showing you the right information for your selected location."
                }
              />
              <CookieSectionRequired
                title={"Security"}
                description={
                  "Security cookies enable us to protect user data from unauthorized access."
                }
              />
            </CookieWrapper>
          </Container>
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CookieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
`;

const Description = styled.p`
  margin-top: 15px;
  max-width: ${({ theme }) => theme.breakpoint.mobile};
`;

export default Cookie;
