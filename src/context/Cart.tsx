import React from "react";

interface Props {
  city: string;
  checkInDate: string;
  checkOutDate: string;
  services: number[];
}

const CartContext = React.createContext<{
  cart?: Props | undefined;
  setCart: React.Dispatch<React.SetStateAction<Props | undefined>>;
}>({
  setCart: () => undefined,
});

const CartProvider = (props: any) => {
  const [cart, setCart] = React.useState<Props | undefined>(undefined);

  return <CartContext.Provider value={{ cart, setCart }} {...props} />;
};

export { CartContext, CartProvider };
