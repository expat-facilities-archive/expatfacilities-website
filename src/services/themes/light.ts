import { Theme } from "src/types/themes";

const light: Theme = {
  id: 1,
  name: "light",
  colors: {
    layout: {
      darkest: "rgb(247, 247, 247)",
      darker: "rgb(255, 255, 255)",
      dark: "rgb(130, 137, 147)",
      light: "rgb(39, 43, 48)",
      lighter: "rgb(26, 29, 31)",
      lightest: "rgb(17, 19, 21)",
    },
    text: {
      lightest: "rgb(17, 19, 21)",
      lighter: "rgb(26, 29, 31)",
      light: "rgb(39, 43, 48)",
      dark: "rgb(210, 211, 219)",
      darker: "rgb(228, 229, 241)",
      darkest: "rgb(255, 255, 255)",
    },
    accent: {
      light: "rgb(255, 46, 15)",
      dark: "rgb(255, 66, 0)",
      red: "rgb(231, 76, 60)",
      green: "rgb(46, 204, 113)",
      blue: "rgb(52, 152, 219)",
      yellow: "rgb(241, 196, 15)",
      white: "rgb(255, 255, 255)",
      black: "rgb(0, 0, 0)",
    },
  },
};

export default light;
