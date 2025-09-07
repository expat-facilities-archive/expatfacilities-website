import React from "react";
import styled from "styled-components";
import Link from "../Layout/Link";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";
import useTranslation from "@hooks/useTranslation";
import LayoutContainer from "@components/Layout/Container";
import Button from "@components/Layout/Button";
import { AuthContext } from "@context/Auth";
import convertRGBToRGBA from "@utils/convertRGBToRGBA";
import useBreakpoint from "@hooks/useBreakpoint";
import Icon from "@components/Layout/Icon";
import { APP_NAME } from "@constants/main";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const { user } = React.useContext(AuthContext);
  const { isMobile } = useBreakpoint();
  const navRef = React.useRef<HTMLUListElement>(null);
  const sizeRef = React.useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [height, setHeight] = React.useState<number>(0);
  const toggle = React.useCallback(() => setIsOpen(!isOpen), [isOpen]);

  React.useEffect(() => {
    const onClick = (e: any) => {
      // If the active element exists and is clicked outside of
      if (navRef.current !== null && !navRef.current.contains(e.target)) {
        toggle();
      }
    };
    if (isOpen && sizeRef.current) {
      setHeight(sizeRef.current.getBoundingClientRect().height);
    } else {
      setHeight(0);
    }

    // If the item is active (ie open) then listen for clicks outside
    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, toggle]);

  return (
    <Container>
      <Wrapper>
        <Content>
          <Brand href={ROUTES.HOME} title={"Home"}>
            <BrandImage
              src={"/static/images/logo/logo-mark.gif"}
              alt={`${APP_NAME} logo`}
              draggable={false}
              height={36}
              width={36}
            />
          </Brand>
          <Nav height={height} isOpen={isOpen} ref={navRef}>
            <GhostContainer ref={sizeRef}>
              <NavItem>
                <NavLink
                  href={ROUTES.DESTINATIONS}
                  active={pathname.includes(ROUTES.DESTINATIONS)}
                  title={t("destinations")}
                >
                  <NavText>{t("destinations")}</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href={ROUTES.SERVICES}
                  active={pathname.includes(ROUTES.SERVICES)}
                  title={t("services")}
                >
                  <NavText>{t("services")}</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href={ROUTES.BLOG}
                  active={pathname.includes(ROUTES.BLOG)}
                  title={t("blog")}
                >
                  <NavText>{t("blog")}</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href={ROUTES.ABOUT}
                  active={pathname === ROUTES.ABOUT}
                  title={t("about")}
                >
                  <NavText>{t("about")}</NavText>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavButton
                  href={user ? ROUTES.DASHBOARD : ROUTES.AUTH}
                  title={user ? t("dashboard") : t("login")}
                >
                  <NavText>{user ? t("dashboard") : t("login")}</NavText>
                </NavButton>
              </NavItem>
            </GhostContainer>
          </Nav>
          {isMobile && (
            <MobileButton mode={"darker"} shape={"round"} onClick={toggle}>
              <Icon name={"menu"} />
            </MobileButton>
          )}
        </Content>
      </Wrapper>
    </Container>
  );
};

const GhostContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Container = styled.nav`
  position: fixed;
  display: flex;
  align-items: center;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  transition: all 0.2s;
  pointer-events: none;
  user-select: none;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-left: 0;
  }
`;

const Wrapper = styled(LayoutContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  backdrop-filter: blur(7px);
  background-color: ${({ theme }) =>
    convertRGBToRGBA(theme.colors.layout.darker, 0.8)};
  border-radius: 99999px;
  margin-top: 15px;
  padding: 0 8px;
  height: 48px;
  margin-left: -8px;
  pointer-events: auto;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    margin-left: 0;
    justify-content: space-between;
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

const Nav = styled.ul<{ isOpen: boolean; height: number }>`
  transition: height 0.5s, padding 0.2s;
  margin-left: 15px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-left: 0;
    height: ${({ isOpen, height }) => (isOpen ? `${height}px` : "0")};
    padding: ${({ isOpen }) => (isOpen ? "8px " : "0 8px")};
    overflow: hidden;
    position: absolute;
    right: 8px;
    top: calc(100% + 5px);
    backdrop-filter: blur(7px);
    background-color: ${({ theme }) =>
      convertRGBToRGBA(theme.colors.layout.darker, 0.8)};
    border-radius: 10px;
  }
`;

const NavItem = styled.li`
  margin: 0 10px;
  white-space: nowrap;

  :first-child {
    margin-left: 0;
  }

  :last-child {
    margin-right: 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin: 8px 0;
  }

  :first-child {
    margin-top: 0;
  }

  :last-child {
    margin-bottom: 0;
  }
`;

const NavLink = styled(Link)<{ active: boolean; soon?: boolean }>`
  position: relative;
  color: ${({ theme }) => theme.colors.text.lightest};
  font-weight: ${({ active }) => (active ? "600" : "400")};
  display: flex;
  align-items: center;
`;

const NavText = styled.span``;

const NavButton = styled(({ children, ...props }) => (
  <Button forwardedAs={Link} {...props}>
    {children}
  </Button>
))`
  padding: 8px 16px;
  border-radius: 99999px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 8px;
  }
`;

const MobileButton = styled(Button)`
  height: 40px;
  width: 40px;
`;

export default Navbar;
