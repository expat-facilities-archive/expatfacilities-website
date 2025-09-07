import { NextPage } from "next";
import LayoutContainer from "@components/Layout/Container";
import LayoutMain from "@components/Layout/Main";
import Background from "@components/Background";
import Head from "@components/Head";
import Featured from "@components/Home/Featured";
import Partner from "@components/Home/Partner";
import Ambassador from "@components/Home/Ambassador";
import Wrapper from "@components/Wrapper";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { Country } from "@typeDefs/destinations";
import { GET_RANDOM_COUNTRIES } from "@queries/countries";
import useTranslation from "@hooks/useTranslation";
import Faq from "@components/Home/Faq";
import React from "react";
import Questions from "@data/questions";
import Steps from "@components/Home/Steps";
import ServiceGrid from "@components/Service/Grid";
import Testimonial from "@components/Home/Testimonial";
import DestinationCarousel from "@components/Carousel/Destination";
import CommunityCarousel from "@components/Carousel/Community";

interface Props {
  data: {
    getRandomCountries: Country[];
  };
}

const Home: NextPage<Props> = ({ data }: Props) => {
  const { t } = useTranslation("home/common");
  return (
    <Wrapper>
      <LayoutMain>
        <Head title={t("head.title")} description={t("head.description")} />
        <Background src={"/static/images/backgrounds/home.jpg"} />
        <LayoutContainer>
          <Featured />
          <Steps />
          <DestinationCarousel countries={data.getRandomCountries ?? []} />
          <ServiceGrid />
          <Testimonial />
          <Ambassador />
          <Partner />
          <Faq data={[...Questions]} />
          <CommunityCarousel />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

Home.getInitialProps = async () => {
  const { cache, query } = await getStandaloneApolloClient();
  const {
    data: { getRandomCountries },
  }: { data: { getRandomCountries: Country[] } } = await query({
    query: GET_RANDOM_COUNTRIES,
    variables: {
      amount: 10,
    },
  });

  return {
    apolloStaticCache: cache.extract(),
    data: { getRandomCountries },
  };
};

export default Home;
