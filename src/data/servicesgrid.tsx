import AmbassadorIcon from "@components/Service/Icon/Ambassador";
import HousingIcon from "@components/Service/Icon/Housing";
import InsuranceIcon from "@components/Service/Icon/Insurance";
import InternshipIcon from "@components/Service/Icon/Internship";
import TransportIcon from "@components/Service/Icon/Transport";
import VisaIcon from "@components/Service/Icon/Visa";
import ROUTES from "@constants/routes";

const services = [
  {
    name: "visa",
    title: "services.visa.title",
    description: "services.visa.description",
    icon: <VisaIcon />,
    link: ROUTES.SERVICES,
  },
  {
    name: "ambassador",
    title: "services.ambassador.title",
    description: "services.ambassador.description",
    icon: <AmbassadorIcon />,
    link: ROUTES.AMBASSADOR,
  },
  {
    name: "housing",
    title: "services.housing.title",
    description: "services.housing.description",
    icon: <HousingIcon />,
    link: ROUTES.SERVICES,
  },
  {
    name: "transport",
    title: "services.transport.title",
    description: "services.transport.description",
    icon: <TransportIcon />,
    link: ROUTES.SERVICES,
  },
  {
    name: "insurance",
    title: "services.insurance.title",
    description: "services.insurance.description",
    icon: <InsuranceIcon />,
    link: ROUTES.SERVICES,
  },
  {
    name: "internship",
    title: "services.internship.title",
    description: "services.internship.description",
    icon: <InternshipIcon />,
    link: ROUTES.SERVICES,
  },
];

export default services;
