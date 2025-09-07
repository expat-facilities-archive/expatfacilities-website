import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardUserProfileEdit from "@screens/Dashboard/Admin/User/Profile/Edit";

export default withAuth(DashboardUserProfileEdit, [roleType.ADMIN]);
