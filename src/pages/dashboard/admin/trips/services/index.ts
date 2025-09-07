import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DashboardAdminTripService from "@screens/Dashboard/Admin/Trips/Services";

export default withAuth(DashboardAdminTripService, [roleType.ADMIN]);
