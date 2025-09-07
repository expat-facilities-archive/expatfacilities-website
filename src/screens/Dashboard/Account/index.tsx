import React from "react";
import { NextPage } from "next";
import { DashboardPage } from "@typeDefs/auth";
import AccountGeneral from "@components/Dashboard/Account/General";
import DashboardAccountProvider from "@components/Dashboard/Account/Provider";
import AccountSidebar from "@components/Dashboard/Account/Sidebar";
import ROUTES from "@constants/routes";
import { useRouter } from "next/router";
import useBreakpoint from "@hooks/useBreakpoint";

const DashboardAccount: NextPage<DashboardPage> = ({
  currentUser,
}: DashboardPage) => {
  const { isTablet } = useBreakpoint();
  const title = isTablet ? "Menu" : "General";

  const router = useRouter();
  React.useEffect(() => {
    if (!isTablet) {
      router.push(`${ROUTES.DASHBOARD_ACCOUNT}/general`, undefined, {
        shallow: true,
      });
    }
  }, [isTablet, router]);

  return (
    <DashboardAccountProvider
      title={title}
      currentUser={currentUser}
      buttons={isTablet}
    >
      {isTablet ? (
        <AccountSidebar />
      ) : (
        currentUser && <AccountGeneral user={currentUser} />
      )}
    </DashboardAccountProvider>
  );
};

export default DashboardAccount;
