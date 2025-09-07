import Loading from "@components/Layout/Loading";
import { MAPBOX_TOKEN } from "@services/mapbox";
import { City, Country } from "@typeDefs/destinations";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import React from "react";
import styled, { useTheme } from "styled-components";

interface Props {
  country: Country;
  location: {
    longitude: number;
    latitude: number;
  };
  setSelectedCity: React.Dispatch<React.SetStateAction<City | null>>;
}

const ExpatriationMap: React.FC<Props> = ({
  country,
  location: { longitude, latitude },
  setSelectedCity,
}: Props) => {
  mapboxgl.accessToken = MAPBOX_TOKEN;

  const theme = useTheme();

  const mapRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<mapboxgl.Map | null>(null);

  React.useEffect(() => {
    // create new mapboxgl.Marker for each city of the country

    const currentMap = new mapboxgl.Map({
      container: mapRef.current || "",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 4,
      scrollZoom: false,
    });

    currentMap.addControl(new mapboxgl.NavigationControl());

    const bounds = new mapboxgl.LngLatBounds();

    currentMap.on("load", () => {
      country.cities.forEach((city) => {
        const marker = new mapboxgl.Marker({
          color: theme.colors.accent.light,
          draggable: false,
        })
          .setLngLat([city.longitude, city.latitude])
          .addTo(currentMap);

        marker.getElement().addEventListener("click", () => {
          setSelectedCity(city);
        });

        bounds.extend([city.longitude, city.latitude]);
      });

      currentMap.fitBounds(bounds, { padding: 75, maxZoom: 10 });

      setMap(currentMap);
    });
  }, [
    country.cities,
    latitude,
    longitude,
    setSelectedCity,
    theme.colors.accent.light,
  ]);

  return <Container ref={mapRef}>{!map && <Loading />}</Container>;
};

const Container = styled.div`
  position: relative;
  height: 320px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(168, 179, 207, 0.2);
  overflow: hidden;
  z-index: 1;
  // marker styles
  .mapboxgl-marker {
    cursor: pointer;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin-top: 15px;
  }
`;

export default ExpatriationMap;
