import { NextPage } from "next";
import { DashboardPage } from "@typeDefs/auth";
import DashboardAccountProvider from "@components/Dashboard/Account/Provider";

const DashboardAccountNotifications: NextPage<DashboardPage> = ({
  currentUser,
}: DashboardPage) => {
  // TODO - Implement notifications
  return (
    <DashboardAccountProvider
      title={"Notifications"}
      currentUser={currentUser}
      buttons={false}
    >
      {currentUser && <div>notif</div>}
    </DashboardAccountProvider>
  );
};

export default DashboardAccountNotifications;
