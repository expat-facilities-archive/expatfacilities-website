import Button from "@components/Layout/Button";
import LayoutContainer from "@components/Layout/Container";
import Script from "@components/Script";
import { CookieParams } from "@typeDefs/cookie";
import Cookies from "js-cookie";
import React from "react";
import styled from "styled-components";
import ROUTES from "@constants/routes";
import { useRouter } from "next/router";

const Cookie: React.FC = () => {
  const router = useRouter();
  const [type, setType] = React.useState(cookieType.unloaded);

  const defaultParams: CookieParams = {
    preferences: true,
    advertising: true,
    analytics: true,
  };

  const disableParams: CookieParams = {
    preferences: false,
    advertising: false,
    analytics: false,
  };

  React.useEffect(() => {
    const cookie = Cookies.get("cookie_params");
    if (cookie || router.asPath === ROUTES.SETTINGS_COOKIE) {
      setType(cookieType.active);
    } else {
      setType(cookieType.inactive);
    }
  }, [router.asPath, setType]);

  switch (type) {
    case cookieType.active:
      return <Script />;
    case cookieType.inactive:
      return (
        <Container>
          <LayoutContainer>
            <Content>
              <Text>
                <Title>{"Utilisation des cookies"}</Title>
                <Description>
                  {
                    "Notre site utilise des cookies nécessaires au bon fonctionnement de nos services. En navigant sur notre site, tu acceptes l'utilisation de ces cookies."
                  }
                </Description>
              </Text>
              <CookieButton
                onClick={() => {
                  Cookies.set("cookie_params", JSON.stringify(disableParams), {
                    expires: 365,
                  });
                  router.push(ROUTES.SETTINGS_COOKIE);
                }}
                mode={"darkest"}
                shape={"square"}
              >
                {"Gérer les cookies"}
              </CookieButton>
              <CookieButton
                shape={"square"}
                onClick={() => {
                  setType(cookieType.active);
                  Cookies.set("cookie_params", JSON.stringify(defaultParams), {
                    expires: 365,
                  });
                }}
              >
                {"Tout accepter"}
              </CookieButton>
            </Content>
          </LayoutContainer>
        </Container>
      );
    default:
      return <></>;
  }
};

enum cookieType {
  unloaded,
  active,
  inactive,
}

const Container = styled.div`
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  padding: 15px;
  margin-bottom: 30px;
  border-radius: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
  }
`;

const Text = styled.div``;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
`;

const Description = styled.p`
  padding-right: 10px;
`;

const CookieButton = styled(Button)`
  display: flex;
  margin-right: 10px;
  white-space: nowrap;
  :last-child {
    margin-right: 0;
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 10px;
    margin-right: 0;
    width: 100%;
    white-space: normal;
  }
`;

export default Cookie;
