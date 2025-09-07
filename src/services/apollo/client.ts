// Static client replacement for Apollo Client
import { StaticApolloClient } from './static-client';

export const client: any = new StaticApolloClient();

export const getStandaloneApolloClient = async () => {
  return new StaticApolloClient();
};

export const getAuthApolloClient = async (_ctx: any) => {
  return new StaticApolloClient();
};
