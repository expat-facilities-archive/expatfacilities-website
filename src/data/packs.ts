import { Pack } from "@typeDefs/destinations";

// API-compatible pack structure
export interface ApiPack {
  id: number;
  name: string;
  slug: string;
  minItems: number;
  maxItems: number;
  discount: string;
}

// API packs data from expatfacilities-api
export const API_PACKS: ApiPack[] = [
  {
    id: 1,
    name: "SinglePick",
    slug: "singlepick",
    minItems: 1,
    maxItems: 2,
    discount: "",
  },
  {
    id: 2,
    name: "BackPacker",
    slug: "backpacker",
    minItems: 3,
    maxItems: 3,
    discount: "",
  },
  {
    id: 3,
    name: "Discovery",
    slug: "discovery",
    minItems: 4,
    maxItems: 5,
    discount: "",
  },
];

// Website-compatible pack format (existing format)
const packs: Pack[] = [
  {
    id: "singlepick",
    title: "SinglePick",
    numberOfServices: "1 à 2",
  },
  {
    id: "backpacker",
    title: "Le BackPacker",
    subtitle: "Économisez 5%",
    numberOfServices: "3",
  },
  {
    id: "discovery",
    title: "Le Discovery",
    subtitle: "Économisez 10%",
    numberOfServices: "4 à 5",
  },
];

export default packs;
