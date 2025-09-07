export type WCountry = {
  id: string;
  name: string;
  iso2: string;
  iso3: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  region: string;
  translations: WTranslation;
  latitude: string;
  longitude: string;
  emoji: string;
};

type WTranslation = {
  fr: string;
  de: string;
  es: string;
};
