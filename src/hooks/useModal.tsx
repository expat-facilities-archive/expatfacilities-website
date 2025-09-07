import React from "react";

const useModal = (): [active: boolean, open: () => void, close: () => void] => {
  const [active, setActive] = React.useState(false);

  const open = () => {
    setActive(true);
  };

  const close = React.useCallback(() => setActive(false), []);

  const handleEscape = React.useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  React.useEffect(() => {
    if (active) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, active]);

  return [active, open, close];
};

export default useModal;
