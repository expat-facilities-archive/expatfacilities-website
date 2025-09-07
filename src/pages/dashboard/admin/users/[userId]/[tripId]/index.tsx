import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardUserProfileTrip from "@screens/Dashboard/Admin/User/Profile/Trip";

export default withAuth(DashboardUserProfileTrip, [roleType.ADMIN]);
