import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import Countries from "@screens/Dashboard/Admin/Countries";

export default withAuth(Countries, [roleType.ADMIN]);
