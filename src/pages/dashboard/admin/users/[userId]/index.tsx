import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardUserProfile from "@screens/Dashboard/Admin/User/Profile";

export default withAuth(DashboardUserProfile, [roleType.ADMIN]);
