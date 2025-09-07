import main from "./main";
import dark from "./dark";
import { Theme } from "src/types/themes";
import light from "./light";

const complete = (theme: Theme) => {
  return { ...main, ...theme };
};

const themes = { dark: complete(dark), light: complete(light) };

export default themes;
