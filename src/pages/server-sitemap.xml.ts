/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-anonymous-default-export */

import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { GET_COUNTRIES } from "@queries/countries";
import { getStandaloneApolloClient } from "@services/apollo/client";
import { City, Country } from "@typeDefs/destinations";
import { getPosts } from "@services/wordpress";
import ROUTES from "@constants/routes";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locales } = ctx;

  const { query } = await getStandaloneApolloClient();
  const {
    data: { getCountries: countries },
  }: { data: { getCountries: Country[] } } = await query({
    query: GET_COUNTRIES,
  });

  const countriesFields = countries.map((country: Country) => {
    return {
      loc: `https://expatfacilities.co${ROUTES.EXPATRIATION}/${country.slug}`, // Absolute url
      lastmod: new Date().toISOString(),
      priority: 0.7,
      alternateRefs: locales
        ? locales.map((locale) => {
            return {
              href: `https://expatfacilities.co/${locale}${ROUTES.EXPATRIATION}/${country.slug}`,
              hreflang: locale,
            };
          })
        : [],
    };
  });

  const citiesFields = countries.reduce((acc: any, country: Country) => {
    return [
      ...acc,
      ...country.cities.map((city: City) => {
        return {
          loc: `https://expatfacilities.co${ROUTES.EXPATRIATION}/${country.slug}/${city.slug}`, // Absolute url
          lastmod: new Date().toISOString(),
          priority: 0.6,
          alternateRefs: locales
            ? locales.map((locale) => {
                return {
                  href: `https://expatfacilities.co/${locale}${ROUTES.EXPATRIATION}/${country.slug}/${city.slug}`,
                  hreflang: locale,
                };
              })
            : [],
        };
      }),
    ];
  }, []);

  const posts = await getPosts();
  const postsFields = posts.map((post) => {
    return {
      loc: `https://expatfacilities.co${ROUTES.BLOG_ARTICLE}/${post.slug}`, // Absolute url
      lastmod: new Date(post.date).toISOString(),
      priority: 0.7,
      alternateRefs: locales
        ? locales.map((locale) => {
            return {
              href: `https://expatfacilities.co/${locale}${ROUTES.BLOG_ARTICLE}/${post.slug}`,
              hreflang: locale,
            };
          })
        : [],
    };
  });

  const fields = [...postsFields, ...countriesFields, ...citiesFields];

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors

export default () => {};
