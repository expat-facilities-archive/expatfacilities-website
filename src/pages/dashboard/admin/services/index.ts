import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardServicesPage from "@screens/Dashboard/Admin/Service";

export default withAuth(DashboardServicesPage, [roleType.ADMIN]);
