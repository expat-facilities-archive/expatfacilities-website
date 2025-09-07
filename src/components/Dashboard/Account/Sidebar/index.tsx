import Link from "@components/Layout/Link";
import ROUTES from "@constants/routes";
import React from "react";
import styled from "styled-components";

import AccountSidebarItem from "./Item";

const AccountSidebar: React.FC = () => {
  return (
    <Container>
      <AccountSidebarItem
        title={"General"}
        url={ROUTES.DASHBOARD_ACCOUNT_GENERAL}
      />
      <AccountSidebarItem
        title={"Security and privacy"}
        url={ROUTES.DASHBOARD_ACCOUNT_SECURITY}
      />
      <AccountSidebarItem
        title={"Notifications"}
        url={ROUTES.DASHBOARD_ACCOUNT_NOTIFICATIONS}
      />
      <AccountSidebarItem
        title={"Display and languages"}
        url={ROUTES.DASHBOARD_ACCOUNT_DISPLAY}
      />
      <AccountSidebarItem title={"Cookies"} url={ROUTES.SETTINGS_COOKIE} />
      <AccountSidebarItem title={"Help center"} url={ROUTES.SUPPORT} />
      <Switch
        forwardedAs={"a"}
        href={
          "mailto:international.relations@expatfacilities.co?Subject=I%20want%20to%20become%20an%20ambassador%20/%20Je%20souhaite%20devenir%20ambassadeur&Body=Last%20Name%20/%20Nom: %0A%0AFirst%20Name%20/%20Prénom: %0A%0APhone%20Number%20/%20Numéro%20de%20téléphone: %0A%0AEmail%20Address%20/%20Adresse%20e-mail: %0A%0ACity%20and%20Country%20of%20residence%20/%20Ville%20et%20Pays%20de%20résidence: %0A%0ACurrent%20Activity%20/%20Activité%20actuelle: %0A%0AMotivations%20for%20this%20job/%20Motivations%20pour%20ce%20poste:%20"
        }
      >
        {"Switch to Ambassador account"}
      </Switch>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.layout.darkest};
  width: 300px;
  border-right: 1px solid ${({ theme }) => theme.colors.layout.dark};
  height: 100%;
  @media (max-width: ${({ theme }) => theme.breakpoint.tablet}) {
    width: 100%;
    border-right: none;
  }
`;

const Switch = styled(Link)`
  margin-top: 15px;
  text-align: center;
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.small};
`;

export default AccountSidebar;
