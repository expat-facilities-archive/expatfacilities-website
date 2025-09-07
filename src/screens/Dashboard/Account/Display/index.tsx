import { NextPage } from "next";
import { DashboardPage } from "@typeDefs/auth";
import DashboardAccountProvider from "@components/Dashboard/Account/Provider";
import DashboardAccountDisplayTheme from "@components/Dashboard/Account/Display/Theme";
import DashboardAccountDisplayLanguage from "@components/Dashboard/Account/Display/Language";

const DashboardAccountDisplay: NextPage<DashboardPage> = ({
  currentUser,
}: DashboardPage) => {
  return (
    <DashboardAccountProvider
      currentUser={currentUser}
      title={"Display and languages"}
      buttons={false}
    >
      <DashboardAccountDisplayLanguage />
      <DashboardAccountDisplayTheme />
    </DashboardAccountProvider>
  );
};

export default DashboardAccountDisplay;
