import { useState, useEffect } from 'react';
import StaticDataService from '../services/static-data';

interface QueryResult<T = any> {
  data: T | undefined;
  loading: boolean;
  error: any;
  refetch?: () => void;
}

// Query name to service method mapping
const queryMapping: Record<string, (variables?: any) => Promise<any>> = {
  // Services
  getServices: StaticDataService.getServices,
  getService: StaticDataService.getService,
  getServiceByType: StaticDataService.getServiceByType,
  getCountryVariableServices: StaticDataService.getCountryVariableServices,
  getVariableServicesPrices: StaticDataService.getVariableServicesPrices,

  // Countries
  getCountries: StaticDataService.getCountries,
  getRandomCountries: StaticDataService.getRandomCountries,
  getCountrySuggestions: StaticDataService.getCountrySuggestions,
  getCountry: StaticDataService.getCountry,
  getCountryBySlug: StaticDataService.getCountryBySlug,
  getCountryByIso2: StaticDataService.getCountryByIso2,
  getCountryByIso3: StaticDataService.getCountryByIso3,

  // Regions
  getRegions: StaticDataService.getRegions,

  // Packs
  getPacks: StaticDataService.getPacks,
  getPack: StaticDataService.getPack,
  getPackBySlug: StaticDataService.getPackBySlug,

  // Cities
  getCities: StaticDataService.getCities,

  // World countries
  getWorldCountries: StaticDataService.getWorldCountries,
  getCountriesCitiesByIso2: StaticDataService.getCountriesCitiesByIso2,

  // Users
  getCurrentUser: StaticDataService.getCurrentUser,
  getUsers: StaticDataService.getUsers,
  getUser: StaticDataService.getUser,

  // Trips
  getTrips: StaticDataService.getTrips,

  // Instagram
  getInstagramPosts: StaticDataService.getInstagramPosts,

  // Others
  getNotifications: StaticDataService.getNotifications,
  getChannels: StaticDataService.getChannels,
  getOrders: StaticDataService.getOrders,
  getPromoCodes: StaticDataService.getPromoCodes,

  // Auth
  getUserEmail: StaticDataService.getUserEmail,
  login: StaticDataService.login,
  loginWithGoogle: StaticDataService.loginWithGoogle,
  register: StaticDataService.register,
  sendVerification: StaticDataService.sendVerification,
  verifyUser: StaticDataService.verifyUser,
  recoverUser: StaticDataService.recoverUser,
  updateUserPassword: StaticDataService.updateUserPassword,
};

// Extract query name from GraphQL query string
function extractQueryName(query: string): string {
  const match = query.match(/(?:query\s+)?(\w+)\s*(?:\(|{)/);
  return match ? match[1] : '';
}

export function useStaticQuery<T = any>(query: any, options: { variables?: any; skip?: boolean } = {}): QueryResult<T> {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (options.skip) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      let queryName = '';
      
      // Handle different query formats
      if (typeof query === 'string') {
        queryName = extractQueryName(query);
      } else if (query && query.definitions && query.definitions[0]) {
        // GraphQL document
        const operation = query.definitions[0];
        if (operation.selectionSet && operation.selectionSet.selections[0]) {
          queryName = operation.selectionSet.selections[0].name.value;
        }
      }

      const serviceMethod = queryMapping[queryName];
      if (!serviceMethod) {
        console.warn(`No static data service found for query: ${queryName}`);
        setData(undefined);
        setLoading(false);
        return;
      }

      const result = await serviceMethod(options.variables);
      setData(result as T);
    } catch (err) {
      console.error('Error fetching static data:', err);
      setError(err as any);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query, JSON.stringify(options.variables), options.skip]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

// For mutations, return a simple mock function
export function useStaticMutation<T = any>(_mutation: any): [
  (options?: { variables?: any }) => Promise<{ data: T }>,
  { data?: T; loading: boolean; error: any }
] {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeMutation = async (_options: { variables?: any } = {}) => {
    setLoading(true);
    setError(null);

    try {
      // For static version, just return success response
      const result = { success: true } as unknown as T;
      setData(result);
      setLoading(false);
      return { data: result };
    } catch (err) {
      setError(err as any);
      setLoading(false);
      throw err;
    }
  };

  return [executeMutation, { data, loading, error }];
}

export default useStaticQuery;