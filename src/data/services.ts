export interface ServiceOffer {
  id: number;
  name: string;
  price: number;
  commission?: number;
}

export interface RequiredFieldOption {
  name: string;
  label: string;
}

export interface RequiredField {
  name: string;
  label: string;
  type: string;
  options?: {
    values: RequiredFieldOption[];
    defaultValue?: string;
  };
}

export interface Service {
  id: number;
  name: string;
  type: string;
  description: string;
  details: string;
  thumbnailUrl: string;
  offers?: ServiceOffer[];
  countryVariable: boolean;
  available: boolean;
  price: number;
  commission: number;
  startingPrice?: number;
  requiredFields: RequiredField[];
}

export const SERVICES: Service[] = [
  {
    id: 1,
    name: "Insurance",
    type: "insurance",
    description: "Comprehensive travel insurance for your expatriation journey",
    details: "Full coverage insurance with multiple formulas available",
    thumbnailUrl: "/static/images/services/insurance.png",
    offers: [
      {
        id: 1,
        name: "Formule 1",
        price: 0,
        commission: 30,
      },
      {
        id: 2,
        name: "Formule 2",
        price: 0,
        commission: 30,
      },
    ],
    countryVariable: true,
    available: true,
    price: 0,
    commission: 0,
    requiredFields: [
      {
        name: "domicileCountry",
        label: "Country of domicile",
        type: "select",
        options: {
          values: [
            {
              name: "FR",
              label: "France métropolitaine",
            },
            {
              name: "GP",
              label: "Guadeloupe",
            },
            {
              name: "GF",
              label: "Guyane Française",
            },
            {
              name: "MQ",
              label: "Martinique",
            },
            {
              name: "YT",
              label: "Mayotte",
            },
            {
              name: "RE",
              label: "Reunion",
            },
            {
              name: "XB",
              label: "Saint Barthélemy",
            },
          ],
        },
      },
    ],
  },
  {
    id: 2,
    name: "Visa",
    type: "visa",
    description: "Visa assistance and processing services",
    details: "Complete visa handling for your destination country",
    thumbnailUrl: "/static/images/services/visa.png",
    countryVariable: true,
    available: true,
    price: 0,
    commission: 20,
    requiredFields: [],
  },
  {
    id: 3,
    name: "Transportation",
    type: "transportation",
    description: "Complete transportation solutions",
    details: "Flight booking and ground transportation arrangements",
    thumbnailUrl: "/static/images/services/transportation.png",
    countryVariable: false,
    available: true,
    price: 34.99,
    commission: 0,
    requiredFields: [
      {
        name: "luggages",
        label: "Bagages (bagage à main non compris)",
        type: "select",
        options: {
          values: [
            {
              name: "0",
              label: "Aucun",
            },
            {
              name: "1",
              label: "1",
            },
            {
              name: "2",
              label: "2",
            },
          ],
        },
      },
      {
        name: "airportToResidencePickUp",
        label: "Prise en charge à l'aéroport jusqu'au domicile",
        type: "checkbox",
      },
      {
        name: "groundTransportationModePreference",
        label: "Préférence de mode de transport terrestre",
        type: "select",
        options: {
          values: [
            {
              name: "train",
              label: "Train",
            },
            {
              name: "bus",
              label: "Bus",
            },
            {
              name: "privateDrive",
              label: "Chauffeur privé",
            },
          ],
        },
      },
      {
        name: "planeTicket",
        label: "Billet d'avion",
        type: "select",
        options: {
          values: [
            {
              name: "economy",
              label: "Economique",
            },
            {
              name: "firstClass",
              label: "Première classe",
            },
            {
              name: "business",
              label: "Business",
            },
          ],
        },
      },
      {
        name: "departureAirportPreference",
        label: "Préférence de l'aéroport de départ",
        type: "text",
      },
      {
        name: "stopOverPreference",
        label: "Escales",
        type: "select",
        options: {
          values: [
            {
              name: "direct",
              label: "Vol direct",
            },
            {
              name: "1",
              label: "1 escale maximum",
            },
            {
              name: "2",
              label: "2 escales maximum",
            },
          ],
        },
      },
    ],
  },
  {
    id: 4,
    name: "Housing",
    type: "housing",
    description: "Student accommodation assistance",
    details: "Find the perfect student housing for your stay",
    startingPrice: 119.99,
    thumbnailUrl: "/static/images/services/housing.png",
    countryVariable: true,
    available: true,
    offers: [
      {
        id: 1,
        name: "Europe",
        price: 119.99,
      },
      {
        id: 2,
        name: "Hors Europe",
        price: 139.99,
      },
    ],
    price: 0,
    commission: 0,
    requiredFields: [
      {
        name: "birthDate",
        label: "Date de naissance",
        type: "date",
      },
      {
        name: "university",
        label: "Université d'accueil",
        type: "text",
      },
      {
        name: "studentId",
        label: "Student ID (Matricule indiqué sur la carte étudiant)",
        type: "text",
      },
      {
        name: "healthSituation",
        label: "Situation sanitaire",
        type: "select",
        options: {
          values: [
            {
              name: "nonVaccinated",
              label: "Non vacciné",
            },
            {
              name: "positiveLastMonth",
              label: "Positif au covid depuis moins d'un mois",
            },
            {
              name: "firstInjection",
              label: "Vacciné(e), Première injection",
            },
            {
              name: "secondInjection",
              label: "Vacciné(e), Deuxième injection",
            },
            {
              name: "thirdVaccinated",
              label: "Vacciné(e), Troisième injection",
            },
          ],
          defaultValue: "Sélectionne une situation",
        },
      },
      {
        name: "semesterNumber",
        label: "Nombre de semestres (1, 2, autre...)",
        type: "text",
      },
      {
        name: "firstDaySchool",
        label: "Date de début des cours",
        type: "date",
      },
      {
        name: "typeOfHousing",
        label: "Type de logement souhaité",
        type: "select",
        options: {
          values: [
            {
              name: "flat",
              label: "Appartement",
            },
            {
              name: "homestay",
              label: "Chambre chez l'habitant",
            },
            {
              name: "studentResidenceRoom",
              label: "Chambre en résidence étudiante",
            },
            {
              name: "studentResidenceStudio",
              label: "Studio en résidence étudiante",
            },
          ],
          defaultValue: "Sélectionne un type de logement",
        },
      },
      {
        name: "flatShare",
        label: "Possibilité de colocation",
        type: "select",
        options: {
          values: [
            {
              name: "yes",
              label: "Oui",
            },
            {
              name: "no",
              label: "Non",
            },
          ],
          defaultValue: "Sélectionne une réponse",
        },
      },
      {
        name: "location",
        label: "Localisation souhaitée",
        type: "text",
      },
      {
        name: "surfaceArea",
        label: "Superficie souhaitée",
        type: "text",
      },
      {
        name: "budget",
        label: "Budget, précises la monnaie",
        type: "text",
      },
      {
        name: "criteria",
        label: "Critères spécifiques : meublé, équipement et services",
        type: "text",
      },
      {
        name: "comment",
        label: "Tu souhaites ajouter un commentaire ?",
        type: "text",
      },
    ],
  },
  {
    id: 5,
    name: "Ambassador",
    type: "ambassador",
    description: "Connect with local student ambassadors",
    details: "Get help from experienced local students",
    startingPrice: 49.99,
    thumbnailUrl: "/static/images/services/ambassador.png",
    countryVariable: false,
    available: true,
    offers: [
      {
        id: 1,
        name: "Tier 1 (2 missions)",
        price: 49.99,
      },
      {
        id: 2,
        name: "Tier 2 (4 missions)",
        price: 99.99,
      },
      {
        id: 3,
        name: "Tier 3 (+6 missions)",
        price: 149.99,
      },
    ],
    price: 0,
    commission: 0,
    requiredFields: [
      {
        name: "missionType",
        label: "Choix d'une mission",
        type: "select",
        options: {
          values: [
            {
              name: "createVisa",
              label: "Finalisation du visa sur place",
            },
            {
              name: "fillUniversityDocuments",
              label: "Finalisation du visa sur place",
            },
            {
              name: "createBankAccount",
              label: "Accompagnement lors de la création d'un compte bancaire local",
            },
            {
              name: "createPhonePlan",
              label: "Accompagnement lors de la création d'une ligne téléphonique",
            },
            {
              name: "createTransportationServicePass",
              label: "Accompagnement lors de la création d'un pass/abonnement aux services de transports en commun locaux",
            },
            {
              name: "PreliminaryAccomodationVerification",
              label: "Vérification préalable du logement",
            },
            {
              name: "accomodationFixturesInventoryAccompagny",
              label: "Accompagner lors de l'état des lieux du logement",
            },
          ],
          defaultValue: "Choisis tes missions",
        },
      },
    ],
  },
  {
    id: 6,
    name: "Language",
    type: "language",
    description: "Language learning and certification",
    details: "Language courses and certification preparation",
    thumbnailUrl: "/static/images/services/language.png",
    commission: 0,
    price: 0,
    available: false,
    countryVariable: false,
    requiredFields: [],
  },
];

export default SERVICES;