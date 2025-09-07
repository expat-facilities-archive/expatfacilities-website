import AmbassadorIcon from "@components/Service/Icon/Ambassador";
import HousingIcon from "@components/Service/Icon/Housing";
import InsuranceIcon from "@components/Service/Icon/Insurance";
import InternshipIcon from "@components/Service/Icon/Internship";
import TransportIcon from "@components/Service/Icon/Transport";
import VisaIcon from "@components/Service/Icon/Visa";

const services = [
  {
    name: "list.visa.name",
    text: ["list.visa.p1", "list.visa.p2", "list.visa.p3"],
    icon: <VisaIcon />,
  },
  {
    name: "list.housing.name",
    text: [
      "list.housing.p1",
      "list.housing.p2",
      "list.housing.p3",
      "list.housing.p4",
    ],
    icon: <HousingIcon />,
  },
  {
    name: "list.ambasador.name",
    text: [
      "list.ambasador.p1",
      "list.ambasador.p2",
      "list.ambasador.p3",
      "list.ambasador.p4",
    ],
    icon: <AmbassadorIcon />,
  },
  {
    name: "list.transport.name",
    text: ["list.transport.p4"],
    icon: <TransportIcon />,
  },
  {
    name: "list.internship.name",
    text: [
      "list.internship.p1",
      "list.internship.p2",
      "list.internship.p3",
      "list.internship.p4",
      "list.internship.p5",
      "list.internship.p6",
      "list.internship.p7",
    ],
    icon: <InternshipIcon />,
  },
  {
    name: "list.insurance.name",
    text: [
      "list.insurance.p1",
      "list.insurance.p2",
      "list.insurance.p3",
      "list.insurance.p4",
    ],
    icon: <InsuranceIcon />,
  },
];

export default services;
