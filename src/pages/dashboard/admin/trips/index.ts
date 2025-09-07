import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardAdminTrips from "@screens/Dashboard/Admin/Trips";

export default withAuth(DashboardAdminTrips, [roleType.ADMIN]);
