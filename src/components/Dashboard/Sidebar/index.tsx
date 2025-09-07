import Link from "@components/Layout/Link";
import styled from "styled-components";
import ROUTES from "@constants/routes";
import { useRouter } from "next/router";
import React from "react";
import SubMenu from "./SubMenu";
import useTranslation from "@hooks/useTranslation";
import Avatar from "@components/Avatar";
import { User } from "@typeDefs/user";
import Button from "@components/Layout/Button";
import Icon from "@components/Layout/Icon";
import useBreakpoint from "@hooks/useBreakpoint";
import { UrlObject } from "url";
import Cookies from "js-cookie";

type Props = {
  user: User;
  close: () => void;
};

const Sidebar: React.FC<Props> = ({ user, close }: Props) => {
  const { t } = useTranslation("dashboard/overview");
  const { pathname } = useRouter();
  const { isMobile } = useBreakpoint();

  const [isToggled, setIsToggled] = React.useState(() => {
    if (typeof window !== "undefined") {
      const cookie = Cookies.get("dashboard_sidebar_expanded");
      if (!cookie) {
        Cookies.set("dashboard_sidebar_expanded", JSON.stringify(true), {
          expires: 365,
        });
        return true;
      }
      return JSON.parse(cookie);
    }
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      Cookies.set("dashboard_sidebar_expanded", JSON.stringify(isToggled), {
        expires: 365,
      });
    }
  }, [isToggled]);

  const [isActive, setIsActive] = React.useState(false);
  const toggleSubMenu = () => setIsActive(!isActive);

  const userRole = user.roles[0].name;

  return (
    <Container isToggled={isToggled}>
      <NavToggler
        isToggled={isToggled}
        onClick={() => setIsToggled(!isToggled)}
      >
        <TogglerIcon name={"arrow-right-s"} isToggled={isToggled} size={20} />
      </NavToggler>
      {isMobile ? (
        <MobileHeader>
          <Avatar user={user} />
          <Icon name={"close"} size={25} onClick={close} />
        </MobileHeader>
      ) : (
        <Header href={ROUTES.DASHBOARD}>
          <Avatar user={user} />
          <Title>{`${user.firstName} ${user.lastName}`}</Title>
        </Header>
      )}
      <Nav>
        <NavItem
          href={ROUTES.DASHBOARD}
          active={pathname == ROUTES.DASHBOARD}
          close={close}
        >
          <NavIcon name={"dashboard"} fill={pathname == ROUTES.DASHBOARD} />
          <NavTitle>{t("sidebar.overview")}</NavTitle>
        </NavItem>
        <NavItem
          href={ROUTES.DASHBOARD_TRIPS}
          active={pathname.includes(ROUTES.DASHBOARD_TRIPS)}
          close={close}
        >
          <NavIcon
            name={"suitcase"}
            fill={pathname.includes(ROUTES.DASHBOARD_TRIPS)}
          />
          <NavTitle>{t("sidebar.trips")}</NavTitle>
        </NavItem>
        <NavItem
          href={ROUTES.DASHBOARD_INBOX}
          active={pathname.includes(ROUTES.DASHBOARD_INBOX)}
          close={close}
        >
          <NavIcon
            name={"message-2"}
            fill={pathname.includes(ROUTES.DASHBOARD_INBOX)}
          />
          <NavTitle>{t("sidebar.inbox")}</NavTitle>
        </NavItem>
        <NavItem
          href={ROUTES.DASHBOARD_NOTIFICATIONS}
          active={pathname.includes(ROUTES.DASHBOARD_NOTIFICATIONS)}
          close={close}
        >
          <NavIcon
            name={"bell"}
            fill={pathname.includes(ROUTES.DASHBOARD_NOTIFICATIONS)}
          />
          <NavTitle>{t("sidebar.notifications")}</NavTitle>
        </NavItem>
        <NavItem
          href={
            isMobile
              ? ROUTES.DASHBOARD_ACCOUNT
              : ROUTES.DASHBOARD_ACCOUNT_GENERAL
          }
          active={pathname.includes(ROUTES.DASHBOARD_ACCOUNT)}
          close={close}
        >
          <NavIcon
            name={"settings"}
            fill={pathname.includes(ROUTES.DASHBOARD_ACCOUNT)}
          />
          <NavTitle>{t("sidebar.settings")}</NavTitle>
        </NavItem>
        {userRole == "admin" && (
          <>
            <NavSeparator>Admin</NavSeparator>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN}
              active={pathname == ROUTES.DASHBOARD_ADMIN}
              close={close}
            >
              <NavIcon
                name={"dashboard-2"}
                fill={pathname == ROUTES.DASHBOARD_ADMIN}
              />
              <NavTitle>{t("sidebar.dashboard")}</NavTitle>
            </NavItem>
            <NavSeparator>Sell</NavSeparator>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN_TRIPS}
              active={pathname == ROUTES.DASHBOARD_ADMIN_TRIPS}
              close={close}
            >
              <NavIcon
                name={"cactus"}
                fill={pathname == ROUTES.DASHBOARD_ADMIN_TRIPS}
              />
              <NavTitle>{"Voyages"}</NavTitle>
            </NavItem>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN_TRIPS_SERVICES}
              active={pathname == ROUTES.DASHBOARD_ADMIN_TRIPS_SERVICES}
              close={close}
            >
              <NavIcon
                name={"settings-6"}
                fill={pathname.includes(ROUTES.DASHBOARD_ADMIN_TRIPS_SERVICES)}
              />
              <NavTitle>{"Services"}</NavTitle>
            </NavItem>
            <NavSeparator>Configure</NavSeparator>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN_COUNTRIES}
              active={pathname.includes(ROUTES.DASHBOARD_ADMIN_COUNTRIES)}
              close={close}
            >
              <NavIcon
                name={"earth"}
                fill={pathname.includes(ROUTES.DASHBOARD_ADMIN_COUNTRIES)}
              />
              <NavTitle>{t("sidebar.countries")}</NavTitle>
            </NavItem>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN_PROMOCODES}
              active={pathname.includes(ROUTES.DASHBOARD_ADMIN_PROMOCODES)}
              close={close}
            >
              <NavIcon
                name={"percent"}
                fill={pathname.includes(ROUTES.DASHBOARD_ADMIN_PROMOCODES)}
              />
              <NavTitle>{t("sidebar.promo-codes")}</NavTitle>
            </NavItem>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN_SERVICES}
              active={pathname.includes(ROUTES.DASHBOARD_ADMIN_SERVICES)}
              close={close}
            >
              <NavIcon
                name={"stack"}
                fill={pathname.includes(ROUTES.DASHBOARD_ADMIN_SERVICES)}
              />
              <NavTitle>{t("sidebar.services")}</NavTitle>
            </NavItem>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN_USERS}
              active={pathname.includes(ROUTES.DASHBOARD_ADMIN_USERS)}
              close={close}
            >
              <NavIcon
                name={"team"}
                fill={pathname.includes(ROUTES.DASHBOARD_ADMIN_USERS)}
              />
              <NavTitle>{t("sidebar.users")}</NavTitle>
            </NavItem>
            <NavItem
              href={ROUTES.DASHBOARD_ADMIN_BLOG}
              active={pathname.includes(ROUTES.DASHBOARD_ADMIN_BLOG)}
              close={close}
            >
              <NavIcon
                name={"article"}
                fill={pathname.includes(ROUTES.DASHBOARD_ADMIN_BLOG)}
              />
              <NavTitle>{t("sidebar.blog")}</NavTitle>
            </NavItem>
          </>
        )}
      </Nav>
      <Footer>
        <FooterItem active={isActive} onClick={toggleSubMenu}>
          <SubMenu setIsActive={setIsActive} isActive={isActive} />
          <NavIcon name={"feedback"} fill={isActive} />
          <FooterTitle>{t("sidebar.feedback")}</FooterTitle>
        </FooterItem>
      </Footer>
    </Container>
  );
};

const FooterTitle = styled.span``;

const NavToggler = styled(Button)<{ isToggled: boolean }>`
  position: absolute;
  z-index: 3;
  right: ${({ isToggled }) => (isToggled ? "15px" : "0")};
  transform: translateX(${({ isToggled }) => (isToggled ? "0" : "50%")})
    translateY(50%);
  width: 25px;
  height: 25px;
  border: none;
  background-color: ${({ theme }) => theme.colors.accent.light};
  color: ${({ theme }) => theme.colors.accent.white};
  text-align: center;
  cursor: pointer;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: none;
  }
`;

const TogglerIcon = styled(Icon)<{ isToggled: boolean }>`
  transition: transform 0.8s;
  transform: ${({ isToggled }) =>
    isToggled ? "rotate(180deg)" : "rotate(0deg)"};
  display: inline-block;
`;

const Header = styled(Link)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  height: 50px;
  padding-left: 15px;
  transition: all 0.2s;
  cursor: pointer;
  font-weight: ${({ theme }) => theme.weight.medium};
  :hover {
    background-color: ${({ theme }) => theme.colors.layout.darker};
  }
`;

const MobileHeader = styled.div`
  display: flex;
  height: 50px;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
`;

const Title = styled.h1`
  white-space: nowrap;
  margin-left: 10px;
  overflow: hidden;
  font-weight: ${({ theme }) => theme.weight.bold};
  text-overflow: ellipsis;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 16px 12px;
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: calc(100% - 12px * 2);
  }
`;

const NavItem = styled(
  ({
    close,
    ...props
  }: {
    close: () => void;
    children: React.ReactNode;
    href?: string | UrlObject;
  }) => {
    return <Link onClick={close} {...props} />;
  }
)<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 4px;
  border-radius: 5px;
  background-color: ${({ active, theme }) =>
    active && theme.colors.accent.light};
  color: ${({ active, theme }) => active && theme.colors.accent.white};
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;

  ::before {
    content: "";
    height: 7px;
    width: 5px;
    position: relative;
    right: 23px;
    background-color: ${({ active, theme }) =>
      active && theme.colors.accent.light};
  }

  :hover {
    color: ${({ active, theme }) => !active && theme.colors.accent.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    background-color: ${({ active, theme }) =>
      active && theme.colors.accent.light};
    ::before {
      all: unset;
    }
  }
`;

const NavTitle = styled.span`
  font-weight: ${({ theme }) => theme.weight.medium};

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.normal};
  }
`;

const NavIcon = styled(Icon)`
  margin-right: 10px;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.large};
  }
`;

const NavSeparator = styled.span`
  font-size: ${({ theme }) => theme.size.tiny};
  margin-top: 20px;
  padding: 0 12px 8px;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.weight.bold};
  color: ${({ theme }) => theme.colors.text.light};
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 16px 12px;
`;

const FooterItem = styled.div<{ active?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 4px;
  border-radius: 5px;
  background-color: ${({ active, theme }) =>
    active && theme.colors.layout.darker};
  user-select: none;
`;

const Container = styled.aside<{ isToggled: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ isToggled }) => (isToggled ? "300" : "65")}px;
  background-color: ${({ theme }) => theme.colors.layout.darker};
  transition: width 0.4s;

  ${Title},
  ${NavSeparator} {
    display: ${({ isToggled }) => (isToggled ? "block" : "none")};
  }

  ${NavTitle},
  ${Footer} {
    opacity: ${({ isToggled }) => (isToggled ? "1" : "0")};
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: ${({ theme }) => theme.colors.layout.darkest};

    ${Title},
    ${NavSeparator} {
      display: block;
    }

    ${NavTitle},
    ${Footer} {
      opacity: 1;
    }
  }
`;

export default Sidebar;
