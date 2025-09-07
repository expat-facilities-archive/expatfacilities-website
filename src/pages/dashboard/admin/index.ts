import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardAdmin from "@screens/Dashboard/Admin";

export default withAuth(DashboardAdmin, [roleType.ADMIN]);
