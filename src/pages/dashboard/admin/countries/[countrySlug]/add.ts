import { roleType } from "@constants/roles";
import withAuth from "@hoc/withAuth";
import DestinationCityAdd from "@screens/Dashboard/Admin/Countries/Edit/Add";

export default withAuth(DestinationCityAdd, [roleType.ADMIN]);
