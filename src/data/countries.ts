import { REGIONS, Region } from './regions';

export interface City {
  id: number;
  name: string;
  slug: string;
  longitude: number;
  latitude: number;
}

export interface ServicePrice {
  serviceId: number;
  price: number;
}

export interface Country {
  id: number;
  slug: string;
  name: string;
  iso2: string;
  iso3?: string;
  description: string;
  thumbnailUrl: string;
  longitude: number;
  latitude: number;
  region: Region;
  cities: City[];
  services_prices: ServicePrice[];
  translations?: any;
}

export const COUNTRIES: Country[] = [
  {
    id: 1,
    slug: "france",
    name: "France",
    iso2: "FR",
    iso3: "FRA",
    description: "Discover the charm and elegance of France, from the romantic streets of Paris to the sun-kissed beaches of the French Riviera.",
    thumbnailUrl: "/static/images/countries/france.jpg",
    longitude: 2.2137,
    latitude: 46.2276,
    region: REGIONS.find(r => r.code === "EU")!,
    cities: [
      {
        id: 1,
        name: "Paris",
        slug: "paris",
        longitude: 2.3522,
        latitude: 48.8566,
      },
      {
        id: 2,
        name: "Lyon",
        slug: "lyon",
        longitude: 4.8357,
        latitude: 45.7640,
      },
      {
        id: 3,
        name: "Marseille",
        slug: "marseille",
        longitude: 5.3698,
        latitude: 43.2965,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 45.99 },
      { serviceId: 2, price: 89.99 },
      { serviceId: 4, price: 119.99 },
    ],
  },
  {
    id: 2,
    slug: "spain",
    name: "Spain",
    iso2: "ES",
    iso3: "ESP",
    description: "Experience the vibrant culture, stunning architecture, and warm hospitality of Spain, from bustling Madrid to beautiful Barcelona.",
    thumbnailUrl: "/static/images/countries/spain.jpg",
    longitude: -3.7492,
    latitude: 40.4637,
    region: REGIONS.find(r => r.code === "EU")!,
    cities: [
      {
        id: 4,
        name: "Madrid",
        slug: "madrid",
        longitude: -3.7026,
        latitude: 40.4168,
      },
      {
        id: 5,
        name: "Barcelona",
        slug: "barcelona",
        longitude: 2.1734,
        latitude: 41.3851,
      },
      {
        id: 6,
        name: "Valencia",
        slug: "valencia",
        longitude: -0.3763,
        latitude: 39.4699,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 42.99 },
      { serviceId: 2, price: 79.99 },
      { serviceId: 4, price: 119.99 },
    ],
  },
  {
    id: 3,
    slug: "germany",
    name: "Germany",
    iso2: "DE",
    iso3: "DEU",
    description: "Explore Germany's rich history, modern cities, and renowned educational institutions from Berlin to Munich.",
    thumbnailUrl: "/static/images/countries/germany.jpg",
    longitude: 10.4515,
    latitude: 51.1657,
    region: REGIONS.find(r => r.code === "EU")!,
    cities: [
      {
        id: 7,
        name: "Berlin",
        slug: "berlin",
        longitude: 13.4050,
        latitude: 52.5200,
      },
      {
        id: 8,
        name: "Munich",
        slug: "munich",
        longitude: 11.5820,
        latitude: 48.1351,
      },
      {
        id: 9,
        name: "Hamburg",
        slug: "hamburg",
        longitude: 9.9937,
        latitude: 53.5511,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 52.99 },
      { serviceId: 2, price: 95.99 },
      { serviceId: 4, price: 119.99 },
    ],
  },
  {
    id: 4,
    slug: "italy",
    name: "Italy",
    iso2: "IT",
    iso3: "ITA",
    description: "Immerse yourself in Italy's art, culture, and cuisine in cities like Rome, Florence, and Venice.",
    thumbnailUrl: "/static/images/countries/italy.jpg",
    longitude: 12.5674,
    latitude: 41.8719,
    region: REGIONS.find(r => r.code === "EU")!,
    cities: [
      {
        id: 10,
        name: "Rome",
        slug: "rome",
        longitude: 12.4964,
        latitude: 41.9028,
      },
      {
        id: 11,
        name: "Milan",
        slug: "milan",
        longitude: 9.1900,
        latitude: 45.4642,
      },
      {
        id: 12,
        name: "Florence",
        slug: "florence",
        longitude: 11.2558,
        latitude: 43.7696,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 48.99 },
      { serviceId: 2, price: 85.99 },
      { serviceId: 4, price: 119.99 },
    ],
  },
  {
    id: 5,
    slug: "united-kingdom",
    name: "United Kingdom",
    iso2: "GB",
    iso3: "GBR",
    description: "Study in the UK's prestigious universities and experience the rich culture from London to Edinburgh.",
    thumbnailUrl: "/static/images/countries/uk.jpg",
    longitude: -3.4360,
    latitude: 55.3781,
    region: REGIONS.find(r => r.code === "EU")!,
    cities: [
      {
        id: 13,
        name: "London",
        slug: "london",
        longitude: -0.1276,
        latitude: 51.5074,
      },
      {
        id: 14,
        name: "Edinburgh",
        slug: "edinburgh",
        longitude: -3.1883,
        latitude: 55.9533,
      },
      {
        id: 15,
        name: "Manchester",
        slug: "manchester",
        longitude: -2.2426,
        latitude: 53.4808,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 65.99 },
      { serviceId: 2, price: 125.99 },
      { serviceId: 4, price: 159.99 },
    ],
  },
  {
    id: 6,
    slug: "canada",
    name: "Canada",
    iso2: "CA",
    iso3: "CAN",
    description: "Experience Canada's natural beauty and multicultural cities from Toronto to Vancouver.",
    thumbnailUrl: "/static/images/countries/canada.jpg",
    longitude: -106.3468,
    latitude: 56.1304,
    region: REGIONS.find(r => r.code === "NA")!,
    cities: [
      {
        id: 16,
        name: "Toronto",
        slug: "toronto",
        longitude: -79.3832,
        latitude: 43.6532,
      },
      {
        id: 17,
        name: "Vancouver",
        slug: "vancouver",
        longitude: -123.1216,
        latitude: 49.2827,
      },
      {
        id: 18,
        name: "Montreal",
        slug: "montreal",
        longitude: -73.5673,
        latitude: 45.5017,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 75.99 },
      { serviceId: 2, price: 145.99 },
      { serviceId: 4, price: 179.99 },
    ],
  },
  {
    id: 7,
    slug: "australia",
    name: "Australia",
    iso2: "AU",
    iso3: "AUS",
    description: "Explore Australia's unique culture and landscapes from Sydney to Melbourne.",
    thumbnailUrl: "/static/images/countries/australia.jpg",
    longitude: 133.7751,
    latitude: -25.2744,
    region: REGIONS.find(r => r.code === "OC")!,
    cities: [
      {
        id: 19,
        name: "Sydney",
        slug: "sydney",
        longitude: 151.2093,
        latitude: -33.8688,
      },
      {
        id: 20,
        name: "Melbourne",
        slug: "melbourne",
        longitude: 144.9631,
        latitude: -37.8136,
      },
      {
        id: 21,
        name: "Brisbane",
        slug: "brisbane",
        longitude: 153.0251,
        latitude: -27.4698,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 85.99 },
      { serviceId: 2, price: 165.99 },
      { serviceId: 4, price: 199.99 },
    ],
  },
  {
    id: 8,
    slug: "japan",
    name: "Japan",
    iso2: "JP",
    iso3: "JPN",
    description: "Discover Japan's fascinating blend of traditional culture and modern innovation in Tokyo and beyond.",
    thumbnailUrl: "/static/images/countries/japan.jpg",
    longitude: 138.2529,
    latitude: 36.2048,
    region: REGIONS.find(r => r.code === "AS")!,
    cities: [
      {
        id: 22,
        name: "Tokyo",
        slug: "tokyo",
        longitude: 139.6917,
        latitude: 35.6895,
      },
      {
        id: 23,
        name: "Osaka",
        slug: "osaka",
        longitude: 135.5023,
        latitude: 34.6937,
      },
      {
        id: 24,
        name: "Kyoto",
        slug: "kyoto",
        longitude: 135.7681,
        latitude: 35.0116,
      },
    ],
    services_prices: [
      { serviceId: 1, price: 95.99 },
      { serviceId: 2, price: 185.99 },
      { serviceId: 4, price: 229.99 },
    ],
  },
];

export default COUNTRIES;