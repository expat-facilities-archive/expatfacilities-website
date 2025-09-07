import { Region } from "./regions";
import { Service, ServiceOffer } from "./services";
import { User } from "./user";

export enum TripState {
  DRAFTED = "drafted",
  COMPLETED = "completed",
  PAID = "paid",
  STARTED = "started",
  ENDED = "ended",
  CANCELLED = "cancelled",
  ARCHIVED = "archived",
}

export type PartialTrip = {
  city?: City;
  services: TripService[];
  // services: PartialTripService[];
  totalPrice: number;
  date: PartialTripDate;
};

export type Trip = PartialTrip & {
  id: string;
  user: User;
  city: City;
  state: string;
  previousState: string;
  // services: TripService[];
  date: TripDate;
};

export type PartialTripDate = {
  start: string;
  end: string;
};

export type TripDate = PartialTripDate & {
  creation: string;
};

export type PartialTripService = {
  selectedOffer?: ServiceOffer;
  totalPrice: number;
  service: Service;
  fields: string;
};

export type TripService = PartialTripService & {
  id: string;
  trip: Trip;
  state: ServiceState;
  previousState: ServiceState;
};

// TODO replace with the new value for dashboard admin trip
export enum ServiceState {
  DRAFTED = "drafted",
  COMPLETED = "completed",
}

export type Country = {
  id: string;
  slug: string;
  name: string;
  iso2: string;
  iso3: string;
  longitude: number;
  latitude: number;
  region: Region;
  services_prices: CountryService[];
  cities: City[];
  description: string;
  thumbnailUrl: string;
  createdAt: string;
  translations: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
  __typename: "Country";
};

export type CountryService = {
  serviceId: number;
  price: number;
};

export type City = {
  id: string;
  country: Country;
  slug: string;
  name: string;
  latitude: number;
  longitude: number;
  __typename: "City";
};

export type Pack = {
  id: string;
  title: string;
  subtitle?: string;
  numberOfServices: string;
};
