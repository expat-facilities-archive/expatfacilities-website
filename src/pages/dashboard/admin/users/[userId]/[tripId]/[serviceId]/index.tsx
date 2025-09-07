import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardUserProfileService from "@screens/Dashboard/Admin/User/Profile/Trip/Service";

export default withAuth(DashboardUserProfileService, [roleType.ADMIN]);
