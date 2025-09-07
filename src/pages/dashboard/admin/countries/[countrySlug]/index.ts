import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DestinationEdit from "@screens/Dashboard/Admin/Countries/Edit";

export default withAuth(DestinationEdit, [roleType.ADMIN]);
