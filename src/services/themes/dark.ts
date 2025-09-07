import { Theme } from "src/types/themes";

const dark: Theme = {
  id: 0,
  name: "dark",
  colors: {
    layout: {
      darkest: "rgb(17, 19, 21)",
      darker: "rgb(26, 29, 31)",
      dark: "rgb(39, 43, 48)",
      light: "rgb(130, 137, 147)",
      lighter: "rgb(155, 155, 156)",
      lightest: "rgb(255, 255, 255)",
    },
    text: {
      lightest: "rgb(255, 255, 255)",
      lighter: "rgb(228, 229, 241)",
      light: "rgb(210, 211, 219)",
      dark: "rgb(39, 43, 48)",
      darker: "rgb(26, 29, 31)",
      darkest: "rgb(17, 19, 21)",
    },
    accent: {
      light: "rgb(255, 66, 0)",
      dark: "rgb(255, 46, 15)",
      red: "rgb(231, 76, 60)",
      green: "rgb(46, 204, 113)",
      blue: "rgb(52, 152, 219)",
      yellow: "rgb(241, 196, 15)",
      white: "rgb(255, 255, 255)",
      black: "rgb(0, 0, 0)",
    },
  },
};

export default dark;
