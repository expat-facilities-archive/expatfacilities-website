export interface Region {
  id: number;
  name: string;
  code: string;
}

export const REGIONS: Region[] = [
  {
    id: 1,
    name: "Africa",
    code: "AF",
  },
  {
    id: 2,
    name: "Antarctica",
    code: "AN",
  },
  {
    id: 3,
    name: "Asia",
    code: "AS",
  },
  {
    id: 4,
    name: "Europe",
    code: "EU",
  },
  {
    id: 5,
    name: "Americas",
    code: "AM",
  },
  {
    id: 6,
    name: "North america",
    code: "NA",
  },
  {
    id: 7,
    name: "Oceania",
    code: "OC",
  },
  {
    id: 8,
    name: "South america",
    code: "SA",
  },
];

export default REGIONS;