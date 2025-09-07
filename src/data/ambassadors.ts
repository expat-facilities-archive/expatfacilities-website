// FAKE DATA
export interface Video {
  ambassadorName: string;
  videoUrl: string;
  country: string;
}
export interface Ambassador {
  name: string;
  thumbnailUrl: string;
  country: string;
}
export interface YourAmbassador {
  name: string;
  thumbnailUrl: string;
  text: string;
  socials: boolean[];
}

export const ambassadors: Ambassador[] = [
  {
    name: "Kim Anh",
    thumbnailUrl: "/static/images/ambassador/thumbnails/kim-anh.jpg",
    country: "Vietnam",
  },
  {
    name: "Alice",
    thumbnailUrl: "/static/images/ambassador/thumbnails/alice.jpg",
    country: "Hong Kong",
  },
  {
    name: "Carlos",
    thumbnailUrl: "/static/images/ambassador/thumbnails/carlos.jpg",
    country: "Mexico City",
  },
  {
    name: "Abdul",
    thumbnailUrl: "/static/images/ambassador/thumbnails/abdul.jpg",
    country: "Canada",
  },
  {
    name: "Andreeva",
    thumbnailUrl: "/static/images/ambassador/thumbnails/andreeva.jpg",
    country: "Russie",
  },
  {
    name: "Chandler",
    thumbnailUrl: "/static/images/ambassador/thumbnails/chandler.jpg",
    country: "Espagne",
  },
  {
    name: "Fabian-Jr",
    thumbnailUrl: "/static/images/ambassador/thumbnails/fabian-jr.jpg",
    country: "Thailande",
  },
  {
    name: "Marco Alonso",
    thumbnailUrl: "/static/images/ambassador/thumbnails/marco.jpg",
    country: "Canada",
  },
  {
    name: "margarita",
    thumbnailUrl: "/static/images/ambassador/thumbnails/margarita.jpg",
    country: "Coree du Sud",
  },
  {
    name: "Maria Jose",
    thumbnailUrl: "/static/images/ambassador/thumbnails/maria-jose.jpg",
    country: "Canada",
  },
  {
    name: "Mark Lee",
    thumbnailUrl: "/static/images/ambassador/thumbnails/mark-lee.jpg",
    country: "Chili",
  },
  {
    name: "Mateus",
    thumbnailUrl: "/static/images/ambassador/thumbnails/mateus.jpg",
    country: "Brésil",
  },
  {
    name: "Michelle Franca",
    thumbnailUrl: "/static/images/ambassador/thumbnails/michelle-franca.jpg",
    country: "Portugal",
  },
  {
    name: "Thomas Brun",
    thumbnailUrl: "/static/images/ambassador/thumbnails/thomas-brun.jpg",
    country: "Finlande",
  },
];

export const yourAmbassadors: YourAmbassador[] = [
  {
    name: "ambassador1.name",
    thumbnailUrl: "/static/images/ambassador/thumbnails/kim-anh.jpg",
    text: "ambassador1.description",
    socials: [true, false, true],
  },
  {
    name: "ambassador2.name",
    thumbnailUrl: "/static/images/ambassador/thumbnails/alice.jpg",
    text: "ambassador2.description",
    socials: [true, false, true],
  },
  {
    name: "ambassador3.name",
    thumbnailUrl: "/static/images/ambassador/thumbnails/marco.jpg",
    text: "ambassador3.description",
    socials: [true, false, true],
  },
];

export const videos: Video[] = [
  {
    ambassadorName: "Martin",
    videoUrl: "https://picsum.photos/id/237/914/514",
    country: "Afghanistan",
  },
  {
    ambassadorName: "Martine",
    videoUrl: "https://picsum.photos/id/25/914/514",
    country: "Belgium",
  },
  {
    ambassadorName: "Tinmar",
    videoUrl: "https://picsum.photos/id/21/914/514",
    country: "Bermuda",
  },
];
