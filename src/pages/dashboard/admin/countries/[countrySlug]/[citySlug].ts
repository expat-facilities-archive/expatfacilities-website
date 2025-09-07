import withAuth from "@hoc/withAuth";
import DestinationCityEdit from "@screens/Dashboard/Admin/Countries/Edit/Edit";

export default withAuth(DestinationCityEdit, ["admin"]);
