import { City, Country } from "@typeDefs/destinations";
import React from "react";
import styled from "styled-components";
import ExpatriationMap from "../Map";
import Sidebar from "../Sidebar";
import PickService from "./Service";
import { Service } from "@typeDefs/services";

interface Props {
  country: Country;
  query: any;
  services: Service[];
  selectedCity: City | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
  checkInDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
  checkOutDate: {
    value: Date;
    setValue: React.Dispatch<React.SetStateAction<Date>>;
  };
}

const ExpatriationPick: React.FC<Props> = ({
  country,
  services,
  selectedCity,
  setSelectedCity,
  checkInDate,
  checkOutDate,
}: Props) => {
  const [selectedServices, setSelectedServices] = React.useState<Array<number>>(
    []
  );

  const location = {
    longitude: country.longitude,
    latitude: country.latitude,
  };

  React.useEffect(() => {
    // if country.cities.id doesnt contain selectedCity.id, set selectedCity to null
    if (
      selectedCity &&
      !country.cities.find((city) => city.id === selectedCity.id)
    ) {
      setSelectedCity(null);
    }
    // if selectedServices is not available in services.available, set selectedServices without the unavailable services
    const availableServices = services.filter((service) => service.available);
    const availableServiceIds = availableServices.map((service) => service.id);

    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.filter((serviceId) =>
        availableServiceIds.includes(serviceId)
      )
    );
  }, [country.cities, selectedCity, services, setSelectedCity]);

  return (
    <Container id={"pick"}>
      <Content>
        <MobileDescription>{country.description}</MobileDescription>
        <ExpatriationMap
          location={location}
          country={country}
          setSelectedCity={setSelectedCity}
        />
        <PickService
          data={[...services].sort((a) => (!a.available ? 1 : -1))}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
        />
      </Content>
      <Sidebar
        country={country}
        setSelectedCity={setSelectedCity}
        selectedCity={selectedCity}
        selectedServices={selectedServices}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        services={services}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 60px;
  padding-top: 30px;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    flex-direction: column;
    padding-top: 60px;
    margin-top: 30px;
  }
`;

const MobileDescription = styled.p`
  @media (min-width: ${({ theme }) => theme.breakpoint.mobile}) {
    display: none;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    padding: 15px;
    width: calc(100% - 15px * 2);,
  }
`;

export default ExpatriationPick;
