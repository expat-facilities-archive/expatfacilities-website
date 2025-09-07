import { NextPage } from "next";
import { DashboardPage } from "@typeDefs/auth";
import DashboardAccountProvider from "@components/Dashboard/Account/Provider";
import AccountGeneral from "@components/Dashboard/Account/General";

const DashboardAccountGeneral: NextPage<DashboardPage> = ({
  currentUser,
}: DashboardPage) => {
  return (
    <DashboardAccountProvider
      title={"General"}
      currentUser={currentUser}
      buttons={false}
    >
      {currentUser && <AccountGeneral user={currentUser} />}
    </DashboardAccountProvider>
  );
};

export default DashboardAccountGeneral;
