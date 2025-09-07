// Static replacement for Apollo Client
import React from 'react';
import { useStaticQuery, useStaticMutation } from '../../hooks/useStaticQuery';

// Re-export the static versions to replace Apollo
export const useQuery = useStaticQuery;
export const useMutation = useStaticMutation;

// Mock Apollo Client for components that import it directly
export class StaticApolloClient {
  cache = {
    extract: () => ({}),  // Mock cache extract method
  };
  query(options: any) {
    const { query, variables } = options;
    
    // Extract query name from the GraphQL query
    let queryName = '';
    if (query && query.definitions && query.definitions[0]) {
      const operation = query.definitions[0];
      if (operation.selectionSet && operation.selectionSet.selections[0]) {
        queryName = operation.selectionSet.selections[0].name.value;
      }
    }
    
    // Route to appropriate static data service method
    const StaticDataService = require('../static-data').default;
    const serviceMethod = (StaticDataService as any)[queryName];
    
    if (serviceMethod) {
      return serviceMethod.call(StaticDataService, variables);
    }
    
    return Promise.resolve({ data: {} });
  }
  
  mutate(options: any) {
    const { mutation, variables } = options;
    
    // Extract mutation name from the GraphQL mutation
    let mutationName = '';
    if (mutation && mutation.definitions && mutation.definitions[0]) {
      const operation = mutation.definitions[0];
      if (operation.selectionSet && operation.selectionSet.selections[0]) {
        mutationName = operation.selectionSet.selections[0].name.value;
      }
    }
    
    // Route to appropriate static data service method
    const StaticDataService = require('../static-data').default;
    const serviceMethod = (StaticDataService as any)[mutationName];
    
    if (serviceMethod) {
      return serviceMethod.call(StaticDataService, variables);
    }
    
    return Promise.resolve({ data: {} });
  }
}

export const client = new StaticApolloClient();

// Mock Apollo Provider
export const ApolloProvider = ({ children }: { client?: any; children: React.ReactNode }): React.ReactElement => {
  return React.createElement(React.Fragment, null, children);
};