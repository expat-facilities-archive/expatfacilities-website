import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardPromoCodesAdd from "@screens/Dashboard/Admin/PromoCodes/Add";

export default withAuth(DashboardPromoCodesAdd, [roleType.ADMIN]);
