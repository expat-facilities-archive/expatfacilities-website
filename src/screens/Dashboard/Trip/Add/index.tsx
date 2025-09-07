import { NextPage } from "next";
import ROUTES from "@constants/routes";
import { useRouter } from "next/router";
import DashboardProvider from "@components/Dashboard/Provider";
import { useMutation } from "@apollo/react-hooks";
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
  const { cart, setCart } = React.useContext(CartContext);
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const [createTrip] = useMutation(CREATE_TRIP, {
    variables: {
      city: cart?.city,
      services: cart?.services || [],
      startDate: formatDate(cart?.checkInDate),
      endDate: formatDate(cart?.checkOutDate),
    },
    onError: (_) => {
      setError(
        "Il y a eu un problème avec la création de ton expatriation. Réessaie plus tard."
      );
    },
    async update(_, { data }) {
      setCart(undefined);
      router.push(`${ROUTES.DASHBOARD_TRIPS}/${data.createTrip.id}`);
    },
  });

  React.useEffect(() => {
    createTrip();
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
