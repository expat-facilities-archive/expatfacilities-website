import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DestinationAdd from "@screens/Dashboard/Admin/Countries/Add";

export default withAuth(DestinationAdd, [roleType.ADMIN]);
