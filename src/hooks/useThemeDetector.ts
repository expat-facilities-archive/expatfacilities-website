import React from "react";

const useThemeDetector = (): boolean => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  if (typeof window !== "undefined") {
    const getCurrentTheme = () =>
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    React.useEffect(() => {
      setIsDarkTheme(getCurrentTheme());
    }, []);
  }

  React.useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    const mqListener = (e: any) => {
      setIsDarkTheme(e.matches);
    };

    darkThemeMq.addListener(mqListener);
    return () => darkThemeMq.removeListener(mqListener);
  }, []);
  return isDarkTheme;
};

export default useThemeDetector;
