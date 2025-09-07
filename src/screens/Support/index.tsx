import Wrapper from "@components/Wrapper";
import { NextPage } from "next";
import LayoutContainer from "@components/Layout/Container";
import LayoutMain from "@components/Layout/Main";
import Head from "@components/Head";
import React from "react";
import Background from "@components/Background";
import Featured from "@components/Support/Featured";
import Faq from "@components/Support/Faq";
import useTranslation from "@hooks/useTranslation";

const Support: NextPage = () => {
  const { t } = useTranslation("support/common");
  return (
    <Wrapper>
      <LayoutMain>
        <Head title={t("head.title")} description={t("head.description")} />
        <LayoutContainer>
          <Background src={"/static/images/backgrounds/faq.jpg"} />
          <Featured />
          <Faq />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

export default Support;
