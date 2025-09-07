import React from "react";

import { AppProps } from "next/app";
import GlobalStyle from "@components/Layout/GlobalStyle";
import Head from "@components/Head";
import { client as apolloClient } from "@services/apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";

import "remixicon/fonts/remixicon.css";
import { AuthProvider } from "@context/Auth";
import Cookie from "@components/Cookie";
import { CartProvider } from "@context/Cart";
import { ToastProvider } from "@context/Toast";
import { GlobalThemeProvider } from "@context/GlobalTheme";
import ProgressBar from "@components/ProgressBar";
import { Elements } from "@stripe/react-stripe-js";
import stripe from "@services/stripe";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <GlobalThemeProvider>
          <Head
            description={
              "Expat Facilities helps students travel abroad through various services: applying for visas and residence permits, finding accommodation and transport..."
            }
          />
          <GlobalStyle />
          <ProgressBar />
          <ToastProvider>
            <CartProvider>
              <Elements stripe={stripe}>
                <Component {...pageProps} />
              </Elements>
            </CartProvider>
          </ToastProvider>
          <Cookie />
        </GlobalThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
