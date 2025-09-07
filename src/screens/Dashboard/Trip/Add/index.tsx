import { NextPage } from "next";
import DashboardProvider from "@components/Dashboard/Provider";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { CREATE_TRIP } from "@queries/trips";
import { DashboardPage } from "@typeDefs/auth";
import Loading from "@components/Layout/Loading";
import React, { useState } from "react";
import { CartContext } from "@context/Cart";
import { formatDate } from "@utils/formatDate";

interface Props extends DashboardPage {
  query: any;
}

const TripAdd: NextPage<Props> = ({ currentUser }: Props) => {
  const { cart } = React.useContext(CartContext);

  const [error] = useState<string | null>(null);

  const [createTrip] = useStaticMutation(CREATE_TRIP);

  React.useEffect(() => {
    createTrip({
      variables: {
        city: cart?.city,
        services: cart?.services || [],
        startDate: formatDate(cart?.checkInDate),
        endDate: formatDate(cart?.checkOutDate),
      }
    });
  }, [createTrip]);

  return (
    <DashboardProvider title={"Trips > Add"} currentUser={currentUser}>
      <Loading message={"Let's go! On crée ton voyage..."} error={error} />
    </DashboardProvider>
  );
};

TripAdd.getInitialProps = async ({ query }) => {
  return { query };
};

export default TripAdd;
