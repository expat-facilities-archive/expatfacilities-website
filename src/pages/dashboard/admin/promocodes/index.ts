import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardPromoCodes from "@screens/Dashboard/Admin/PromoCodes";

export default withAuth(DashboardPromoCodes, [roleType.ADMIN]);
