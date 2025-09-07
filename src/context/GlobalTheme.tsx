import React from "react";
import { ThemeProvider } from "styled-components";
import useThemeDetector from "@hooks/useThemeDetector";
import themes from "@services/themes";
import { Theme } from "@typeDefs/themes";

const GlobalThemeContext = React.createContext({
  globalTheme: themes.dark,
  setGlobalTheme: (_theme: Theme) => undefined,
});

const GlobalThemeProvider = (props: any) => {
  const isDarkTheme = useThemeDetector();
  const [globalTheme, setGlobalTheme] = React.useState(themes.dark);

  React.useEffect(() => {
    setGlobalTheme(isDarkTheme ? themes.dark : themes.light);
  }, [isDarkTheme]);

  return (
    <GlobalThemeContext.Provider
      value={{ globalTheme, setGlobalTheme }}
      {...props}
    >
      <ThemeProvider theme={globalTheme}>{props.children}</ThemeProvider>
    </GlobalThemeContext.Provider>
  );
};

export { GlobalThemeContext, GlobalThemeProvider };
