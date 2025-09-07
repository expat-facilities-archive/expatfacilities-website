import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import React from "react";
import CallButton from "@components/CallButton";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <CallButton />
    </>
  );
};

export default Wrapper;
