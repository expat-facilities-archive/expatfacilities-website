import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardPromoCodeEdit from "@screens/Dashboard/Admin/PromoCodes/Edit";

export default withAuth(DashboardPromoCodeEdit, [roleType.ADMIN]);
