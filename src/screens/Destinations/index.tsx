import { NextPage } from "next";
import styled from "styled-components";

import { GET_COUNTRIES } from "@queries/countries";
import useTranslation from "@hooks/useTranslation";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { Country } from "@typeDefs/destinations";

import LayoutMain from "@components/Layout/Main";
import LayoutContainer from "@components/Layout/Container";
import Head from "@components/Head";
import Background from "@components/Background";
import FeaturedSearchbar from "@components/Home/Featured/Searchbar";
import Wrapper from "@components/Wrapper";
import DestinationMap from "@components/Destination/Map";
import DestinationCarousel from "@components/Carousel/Destination";
import ServiceGrid from "@components/Service/Grid";
import DestinationGallery from "@components/Destination/Gallery";

interface Props {
  data: {
    getCountries: Country[];
  };
}

const Destinations: NextPage<Props> = ({ data }: Props) => {
  const { t } = useTranslation("destinations/common");
  return (
    <Wrapper>
      <LayoutMain>
        <Head title={t("head.title")} description={t("head.description")} />
        <LayoutContainer>
          <Background src={"/static/images/backgrounds/destinations.jpg"} />
          <Title>{t("title")}</Title>
          <SubTitle>{t("subtitle")}</SubTitle>
          <FeaturedSearchbar />
          <DestinationCarousel countries={data.getCountries} />
          <ServiceGrid />
          <DestinationMap countries={data.getCountries} />
          <DestinationGallery />
        </LayoutContainer>
      </LayoutMain>
    </Wrapper>
  );
};

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.weight.bold};
  font-size: ${({ theme }) => theme.size.extraTitle};
  text-align: center;
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.mobile}) {
    font-size: ${({ theme }) => theme.size.title};
  }
`;

const SubTitle = styled.p`
  margin-top: 16px;
  font-weight: ${({ theme }) => theme.weight.medium};
  font-size: ${({ theme }) => theme.size};
  text-align: center;
`;

Destinations.getInitialProps = async () => {
  const { cache, query } = await getStandaloneApolloClient();

  const {
    data: { getCountries },
  }: { data: { getCountries: Country[] } } = await query({
    query: GET_COUNTRIES,
  });

  return {
    apolloStaticCache: cache.extract(),
    data: { getCountries },
  };
};

export default Destinations;
