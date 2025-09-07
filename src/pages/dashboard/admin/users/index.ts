import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardUser from "@screens/Dashboard/Admin/User";

export default withAuth(DashboardUser, [roleType.ADMIN]);
