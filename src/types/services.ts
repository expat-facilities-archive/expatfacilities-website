export type Service = {
  id: number;
  name: string;
  type: ServiceType;
  description: string;
  details: string;
  thumbnailUrl: string;
  startingPrice?: number;
  offers?: ServiceOffer[];
  countryVariable?: boolean;
  available: boolean;
  price: number;
  commission: number;
  requiredFields: ServiceRequiredField[];
};

export type ServiceType =
  | "insurance"
  | "visa"
  | "ambassador"
  | "transportation"
  | "housing";

export type ServiceOffer = {
  id: number;
  name: string;
  price: number;
  commission?: number;
};

type ServiceRequiredField = {
  name: string;
  label: string;
  type: string;
  options?: {
    values: {
      name: string;
      label: string;
    }[];
    defaultValue: string;
  };
};

export type ServiceList = {
  name: string;
  icon: JSX.Element;
  text: string[];
};
