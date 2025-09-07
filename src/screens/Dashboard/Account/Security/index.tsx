import { NextPage } from "next";
import { DashboardPage } from "@typeDefs/auth";
import DashboardAccountProvider from "@components/Dashboard/Account/Provider";
import DashboardAccountSecurityLoginActivity from "@components/Dashboard/Account/Security/LoginActivity";
import DashboardAccountSecurityChangePassword from "@components/Dashboard/Account/Security/ChangePassword";

const DashboardAccountSecurity: NextPage<DashboardPage> = ({
  currentUser,
}: DashboardPage) => {
  return (
    <DashboardAccountProvider
      title={"Security and privacy"}
      currentUser={currentUser}
      buttons={false}
    >
      {currentUser && (
        <DashboardAccountSecurityChangePassword user={currentUser} />
      )}
      <DashboardAccountSecurityLoginActivity />
    </DashboardAccountProvider>
  );
};

export default DashboardAccountSecurity;
