import styled from "styled-components";
import LayoutContainer from "@components/Layout/Container";
import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import { APP_NAME } from "@constants/main";
import React from "react";
import useTranslation from "@hooks/useTranslation";
import { useRouter } from "next/router";
import Icon from "@components/Layout/Icon";

const Footer: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale, locales } = router;

  return (
    <Container>
      <LayoutContainer solid>
        <Row>
          <Col>
            <Brand href={ROUTES.HOME} title={APP_NAME}>
              <BrandImage
                src={"/static/images/logo/logo-mark.gif"}
                alt={"Expat Facilities logo"}
                draggable={false}
                height={36}
                width={36}
              />
            </Brand>
            <List>
              <Item>
                <Icon name={"chat-1"} fill />{" "}
                <CurrentLocale>
                  {t("locale.name")}
                  <LangSelector
                    value={locale}
                    onChange={(event) => {
                      router.push(router.asPath, router.asPath, {
                        locale: event.target.value,
                        shallow: true,
                        scroll: false,
                      });
                    }}
                  >
                    {locales &&
                      locales.map((l: string, i: number) => {
                        let translation: any;
                        try {
                          translation = require(`../../locales/${l}/common.json`);
                        } catch (err) {
                          console.error(
                            "An error occurred while loading the translation file: common.json"
                          );
                        }

                        return (
                          <option key={i} value={l}>
                            {translation.locale.name || l}
                          </option>
                        );
                      })}
                  </LangSelector>
                </CurrentLocale>
              </Item>
            </List>
          </Col>
          <Col>
            <Title>{t("footer.informations.title")}</Title>
            <List>
              <Item>
                <Link href={ROUTES.SUPPORT}>
                  {t("footer.informations.support")}
                </Link>
              </Item>
              <Item>
                <Link href={ROUTES.CONTACT}>
                  {t("footer.informations.contact")}
                </Link>
              </Item>
              <Item>
                <Link href={ROUTES.TERMS}>
                  {t("footer.informations.terms")}
                </Link>
              </Item>
              <Item>
                <Link href={ROUTES.PRIVACY}>
                  {t("footer.informations.privacy")}
                </Link>
              </Item>
              <Item>
                <Link href={ROUTES.SETTINGS_COOKIE}>
                  {t("footer.informations.settings_cookie")}
                </Link>
              </Item>
            </List>
          </Col>
          <Col>
            <Title>{t("footer.company.title")}</Title>
            <List>
              <Item>
                <Link href={ROUTES.ABOUT}>{t("footer.company.about")}</Link>
              </Item>
              {/* <Item>
                <Link href={ROUTES.PARTNERS}>
                  {t("footer.compagny.partners")}
                </Link>
              </Item> */}
              <Item>
                <Link
                  href={"https://linkedin.com/company/expatfacilities/jobs"}
                >
                  {t("footer.company.jobs")}
                </Link>
              </Item>
              <Item>
                <Link href={ROUTES.BLOG}>{t("footer.company.blog")}</Link>
              </Item>
              <Item>
                <Link href={ROUTES.BRANDING}>
                  {t("footer.company.branding")}
                </Link>
              </Item>
            </List>
          </Col>
          <Col>
            <Title>{t("footer.social.title")}</Title>
            <List>
              <Item>
                <Link href={"https://facebook.com/expatfacilities"}>
                  {"Facebook"}
                </Link>
              </Item>
              <Item>
                <Link href={"https://instagram.com/expatfacilities"}>
                  {"Instagram"}
                </Link>
              </Item>
              <Item>
                <Link href={"https://linkedin.com/company/expatfacilities"}>
                  {"LinkedIn"}
                </Link>
              </Item>
              <Item>
                <Link href={"https://twitter.com/expatfacilities"}>
                  {"Twitter"}
                </Link>
              </Item>
              <Item>
                <Link href={"https://tiktok.com/@expatfacilities"}>
                  {"TikTok"}
                </Link>
              </Item>
            </List>
          </Col>
        </Row>
        <Bottom>
          <Copyright>
            © {APP_NAME}, {t("footer.copyright")}
          </Copyright>
        </Bottom>
      </LayoutContainer>
    </Container>
  );
};

export default Footer;

const Container = styled.footer`
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  padding: 60px 0 60px 0;
  position: relative;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: -40px;
  z-index: -1;
  margin-left: -30px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Col = styled.div`
  width: calc(25% - 30px);
  margin-left: 30px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: calc(50% - 30px);
    flex-direction: column;
    margin-top: 30px;
    margin-left: 28px;
  }
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.semiBold};
  margin-top: 15px;

  :first-child {
    margin-top: 0;
  }
`;

const List = styled.ul`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  margin-top: 5px;
  font-size: ${({ theme }) => theme.size.small};

  :first-child {
    margin-top: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 10px;
  }
`;

const Brand = styled(Link)`
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const BrandImage = styled.img`
  height: 36px;
  width: auto;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 18px;
`;

const CurrentLocale = styled.span`
  position: relative;
`;

const LangSelector = styled.select`
  cursor: pointer;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;

const Bottom = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
`;

const Copyright = styled.div`
  font-size: ${({ theme }) => theme.size.small};
`;
