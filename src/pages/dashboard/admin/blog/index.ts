import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardAdminBlog from "@screens/Dashboard/Admin/Blog";

export default withAuth(DashboardAdminBlog, [roleType.ADMIN]);
