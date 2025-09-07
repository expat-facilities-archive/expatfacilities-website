import AmbassadorIcon from "@components/Service/Icon/Ambassador";
import InsuranceIcon from "@components/Service/Icon/Insurance";
import VisaIcon from "@components/Service/Icon/Visa";
import { ServiceType } from "@typeDefs/services";
import styled from "styled-components";
import HousingIcon from "./Housing";
import TransportIcon from "./Transport";

interface Props {
  serviceType: ServiceType;
  size?: number;
}

const ServiceIcon: React.FC<Props> = ({
  serviceType,
  size,
  ...rest
}: Props) => {
  return (
    <Container size={size || 100} {...rest}>
      {
        {
          ["ambassador"]: <AmbassadorIcon />,
          ["housing"]: <HousingIcon />,
          ["insurance"]: <InsuranceIcon />,
          ["visa"]: <VisaIcon />,
          ["transportation"]: <TransportIcon />,
        }[serviceType]
      }
    </Container>
  );
};

const Container = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export default ServiceIcon;
