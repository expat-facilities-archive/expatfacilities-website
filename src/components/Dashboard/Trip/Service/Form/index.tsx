import InsuranceServiceForm from "./Insurance";

import type { Service, ServiceType } from "@typeDefs/services";
import { TripService } from "@typeDefs/destinations";
import { useStaticMutation } from "@hooks/useStaticQuery";
import { CREATE_TRIP_SERVICE, UPDATE_TRIP_SERVICE } from "@queries/services";
import AmbassadorServiceForm from "./Ambassador";
import TransportationServiceForm from "./Transportation";
import VisaServiceForm from "./Visa";
// import { formatAmount } from "@utils/formatAmount";
import HousingServiceForm from "./Housing";
import React from "react";

export interface ServiceFormProps {
  handleSubmit: (data: any) => void;
  service: Service;
  tripService?: TripService;
  setTotalAmount: (amount: number) => void;
  mode: "add" | "complete";
}

interface Props {
  tripId: string;
  type: ServiceType;
  service: Service;
  tripService?: TripService;
  mode: "add" | "complete";
  setTotalAmount: (amount: number) => void;
}

const serviceFormComponents = {
  insurance: InsuranceServiceForm,
  ambassador: AmbassadorServiceForm,
  transportation: TransportationServiceForm,
  visa: VisaServiceForm,
  housing: HousingServiceForm,
};

const TripServiceForm: React.FC<Props> = ({
  tripId,
  type,
  service,
  tripService,
  mode,
  setTotalAmount,
}: Props) => {
  const [_, setLoading] = React.useState<boolean>(false);

  const handleSubmit = (data: any) => {
    setLoading(true);

    switch (mode) {
      case "add":
        createTripService({
          variables: {
            tripId,
            serviceId: service.id,
            selectedOffer: data.selectedOffer,
            fields: JSON.stringify(data),
            initialState: "completed",
          },
        });
        break;
      case "complete":
        completeTripService({
          variables: {
            tripServiceId: tripService?.id,
            selectedOffer: data.selectedOffer,
            fields: JSON.stringify(data),
            stateTransition: "COMPLETE",
          },
        });
        break;
      default:
        break;
    }
  };

  const [createTripService] = useStaticMutation(CREATE_TRIP_SERVICE);

  const [completeTripService] = useStaticMutation(UPDATE_TRIP_SERVICE);

  if (mode === "complete" && !tripService) {
    return null;
  }

  const ServiceFormComponent: React.FC<ServiceFormProps> =
    serviceFormComponents[type];

  return (
    <>
      <ServiceFormComponent
        handleSubmit={handleSubmit}
        service={service}
        tripService={tripService}
        setTotalAmount={setTotalAmount}
        mode={mode}
      />
    </>
  );
};

export default TripServiceForm;
