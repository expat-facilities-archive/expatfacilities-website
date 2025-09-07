import "mapbox-gl/dist/mapbox-gl.css";
import { Country } from "@typeDefs/destinations";
import mapboxgl from "mapbox-gl";
import React from "react";
import styled, { useTheme } from "styled-components";
import { setInterval } from "timers";
import useTranslation from "@hooks/useTranslation";
import { MAPBOX_TOKEN } from "@services/mapbox";
import { useRouter } from "next/router";
import ROUTES from "@constants/routes";

interface Props {
  countries: Country[];
}

const DestinationMap: React.FC<Props> = ({ countries }: Props) => {
  mapboxgl.accessToken = MAPBOX_TOKEN;

  const router = useRouter();
  const theme = useTheme();
  const { t } = useTranslation("destinations/common");

  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapMarkers: mapboxgl.Marker[] = [];

  React.useEffect(() => {
    const currentMap = new mapboxgl.Map({
      container: mapRef.current || "",
      style: "mapbox://styles/mapbox/outdoors-v11?optimize=true",
      center: [2.2, 48.5],
      zoom: 4,
      scrollZoom: false,
    });

    currentMap.addControl(new mapboxgl.NavigationControl());

    const mapAnimation = setInterval(() => {
      mapMarkers.forEach((marker) => marker.remove());
      const country = countries[Math.floor(Math.random() * countries.length)];

      country.cities.forEach((city) => {
        const marker = new mapboxgl.Marker({
          color: theme.colors.accent.light,
          draggable: false,
        })
          .setLngLat([city.longitude, city.latitude])
          .addTo(currentMap);

        marker.getElement().addEventListener("click", () => {
          router.push(`${ROUTES.EXPATRIATION}/${country.slug}/${city.slug}`);
        });

        mapMarkers.push(marker);
      });

      currentMap.easeTo({
        center: [country.longitude, country.latitude],
        zoom: 4,
      });
    }, 1000 * 10);

    return () => {
      clearInterval(mapAnimation);
    };
  }, []);

  return (
    <Container>
      <Title>{t("map.title")}</Title>
      <Subtitle>{t("map.subtitle")}</Subtitle>
      <MapContainer>
        {/* <CountryName>{translation.t(countryName)}</CountryName> */}
        <Map ref={mapRef} />
      </MapContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  font-size: ${({ theme }) => theme.size.title};
  font-weight: ${({ theme }) => theme.weight.bold};
  text-align: center;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.large};
  }
`;
const Subtitle = styled.span`
  font-size: ${({ theme }) => theme.size.normal};
`;
const MapContainer = styled.div`
  margin: 30px 0;
  width: 100%;
  position: relative;
  @media (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    margin: 10px 0;
  }
`;
const Map = styled.div`
  position: relative;
  height: 483px;
  width: 100%;
  border-radius: 10px;
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

export default DestinationMap;
