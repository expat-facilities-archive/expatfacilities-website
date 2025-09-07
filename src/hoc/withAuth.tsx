/* eslint-disable react/display-name */
import { GET_CURRENT_USER } from "@queries/users";
import { getAuthApolloClient } from "@services/apollo/client";
import { NextComponentType, NextPageContext } from "next";
import React from "react";
import Router from "next/router";
import ROUTES from "@constants/routes";

// Big thanks to @louisrli for this article https://louisrli.github.io/blog/2019/11/17/auth-redirect-next-js/

const redirectBasedOnLogin = async (
  ctx: NextPageContext,
  redirectIfAuthed: boolean,
  currentUser: any,
  allowedRoles?: string[]
): Promise<boolean> => {
  const isLoggedIn = currentUser !== null;
  const isAllowed =
    isLoggedIn &&
    (!allowedRoles ||
      (allowedRoles &&
        allowedRoles.length > 0 &&
        currentUser.roles.some((role: { name: string }) =>
          allowedRoles.includes(role.name)
        )));

  const route = isLoggedIn
    ? ROUTES.DASHBOARD
    : `${ROUTES.AUTH}?continue=${ctx.asPath}`;

  const shouldRedirect = redirectIfAuthed ? isLoggedIn : !isLoggedIn;

  if (shouldRedirect || !isAllowed) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: route,
      });
      ctx.res.end();
    } else {
      Router.push(route);
    }
    return Promise.resolve(false);
  }

  return Promise.resolve(true);
};

const withAuth = (
  Page: NextComponentType<NextPageContext, any, any>,
  allowedRoles?: string[]
) => {
  const Auth = (props: any) => {
    return <Page {...props} />;
  };

  Auth.getInitialProps = async (ctx: NextPageContext) => {
    const { query } = await getAuthApolloClient(ctx);
    const { data }: { data: { getCurrentUser: any } } = await query({
      query: GET_CURRENT_USER,
    });
    const currentUser = data.getCurrentUser;

    const shouldContinue = await redirectBasedOnLogin(
      ctx,
      false,
      currentUser,
      allowedRoles
    );

    if (Page.getInitialProps && shouldContinue) {
      const pageProps = await Page.getInitialProps(ctx);
      return await {
        ...pageProps,
        currentUser,
      };
    }

    return { currentUser };
  };
  return Auth;
};

export default withAuth;
