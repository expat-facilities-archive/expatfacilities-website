import { SERVICES } from '../data/services';
import { REGIONS } from '../data/regions';
import { COUNTRIES } from '../data/countries';
import { API_PACKS } from '../data/packs';

// Mock query results that match GraphQL response structure
export class StaticDataService {
  // Services queries
  static getServices(_variables?: any) {
    return Promise.resolve({
      data: {
        getServices: SERVICES.filter(service => service.available)
      }
    });
  }

  static getService(variables: { serviceId: string }) {
    const service = SERVICES.find(s => s.id.toString() === variables.serviceId);
    return Promise.resolve({
      data: {
        getService: service || null
      }
    });
  }

  static getServiceByType(variables: { serviceType: string; countryIso2?: string; checkInDate?: string; checkOutDate?: string }) {
    const service = SERVICES.find(s => s.type === variables.serviceType && s.available);
    return Promise.resolve({
      data: {
        getServiceByType: service || null
      }
    });
  }

  static getCountryVariableServices() {
    return Promise.resolve({
      data: {
        getCountryVariableServices: SERVICES.filter(s => s.countryVariable && s.available)
      }
    });
  }

  static getVariableServicesPrices(variables: { countryIso2: string; checkInDate: string; checkOutDate: string }) {
    const country = COUNTRIES.find(c => c.iso2 === variables.countryIso2);
    if (!country) {
      return Promise.resolve({
        data: {
          getVariableServicesPrices: []
        }
      });
    }

    const servicesWithPrices = SERVICES
      .filter(s => s.countryVariable && s.available)
      .map(service => {
        const priceInfo = country.services_prices.find(sp => sp.serviceId === service.id);
        return {
          ...service,
          price: priceInfo?.price || service.price
        };
      });

    return Promise.resolve({
      data: {
        getVariableServicesPrices: servicesWithPrices
      }
    });
  }

  // Countries queries
  static getCountries(variables?: { query?: string }) {
    let countries = COUNTRIES.map(country => ({
      ...country,
      __typename: 'Country'
    }));
    if (variables?.query) {
      const query = variables.query.toLowerCase();
      countries = countries.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.slug.toLowerCase().includes(query)
      );
    }
    return Promise.resolve({
      data: {
        getCountries: countries
      }
    });
  }

  static getRandomCountries(variables: { amount: number }) {
    const shuffled = [...COUNTRIES].sort(() => 0.5 - Math.random());
    return Promise.resolve({
      data: {
        getRandomCountries: shuffled.slice(0, variables.amount)
      }
    });
  }

  static getCountrySuggestions(variables: { countryId: string; amount: number }) {
    const currentCountry = COUNTRIES.find(c => c.id.toString() === variables.countryId);
    if (!currentCountry) {
      return this.getRandomCountries(variables);
    }

    // Get countries from the same region, excluding the current one
    const suggestions = COUNTRIES
      .filter(c => c.id.toString() !== variables.countryId && c.region.id === currentCountry.region.id)
      .slice(0, variables.amount);

    // If not enough from the same region, fill with random countries
    if (suggestions.length < variables.amount) {
      const remaining = variables.amount - suggestions.length;
      const otherCountries = COUNTRIES
        .filter(c => !suggestions.some(s => s.id === c.id) && c.id.toString() !== variables.countryId)
        .sort(() => 0.5 - Math.random())
        .slice(0, remaining);
      suggestions.push(...otherCountries);
    }

    return Promise.resolve({
      data: {
        getCountrySuggestions: suggestions
      }
    });
  }

  static getCountry(variables: { countryId: string }) {
    const country = COUNTRIES.find(c => c.id.toString() === variables.countryId);
    return Promise.resolve({
      data: {
        getCountry: country || null
      }
    });
  }

  static getCountryBySlug(variables: { countrySlug: string }) {
    const country = COUNTRIES.find(c => c.slug === variables.countrySlug);
    return Promise.resolve({
      data: {
        getCountryBySlug: country || null
      }
    });
  }

  static getCountryByIso2(variables: { iso2: string }) {
    const country = COUNTRIES.find(c => c.iso2 === variables.iso2);
    return Promise.resolve({
      data: {
        getCountryByIso2: country || null
      }
    });
  }

  static getCountryByIso3(variables: { iso3: string }) {
    const country = COUNTRIES.find(c => c.iso3 === variables.iso3);
    return Promise.resolve({
      data: {
        getCountryByIso3: country || null
      }
    });
  }

  // Regions queries
  static getRegions() {
    return Promise.resolve({
      data: {
        getRegions: REGIONS
      }
    });
  }

  // Packs queries
  static getPacks() {
    return Promise.resolve({
      data: {
        getPacks: API_PACKS
      }
    });
  }

  static getPack(variables: { packId: string }) {
    const pack = API_PACKS.find(p => p.id.toString() === variables.packId);
    return Promise.resolve({
      data: {
        getPack: pack || null
      }
    });
  }

  static getPackBySlug(variables: { packSlug: string }) {
    const pack = API_PACKS.find(p => p.slug === variables.packSlug);
    return Promise.resolve({
      data: {
        getPackBySlug: pack || null
      }
    });
  }

  // Cities queries
  static getCities() {
    const allCities: any[] = [];
    COUNTRIES.forEach(country => {
      country.cities.forEach(city => {
        allCities.push({
          ...city,
          __typename: 'City',
          country: {
            id: country.id,
            name: country.name,
            slug: country.slug
          }
        });
      });
    });
    return Promise.resolve({
      data: {
        getCities: allCities
      }
    });
  }

  // World countries queries (simplified)
  static getWorldCountries() {
    return Promise.resolve({
      data: {
        getWorldCountries: COUNTRIES.map(c => ({
          name: c.name,
          iso2: c.iso2,
          iso3: c.iso3
        }))
      }
    });
  }

  static getCountriesCitiesByIso2(variables: { iso2: string }) {
    const country = COUNTRIES.find(c => c.iso2 === variables.iso2);
    return Promise.resolve({
      data: {
        getCountriesCitiesByIso2: country?.cities || []
      }
    });
  }

  // User queries - return empty/mock data for static version
  static getCurrentUser() {
    return Promise.resolve({
      data: {
        getCurrentUser: null
      }
    });
  }

  static getUsers() {
    return Promise.resolve({
      data: {
        getUsers: []
      }
    });
  }

  static getUser(_variables: { userId: string }) {
    return Promise.resolve({
      data: {
        getUser: null
      }
    });
  }

  // Trips queries - return empty data for static version
  static getTrips() {
    return Promise.resolve({
      data: {
        getTrips: []
      }
    });
  }

  // Instagram posts - mock data
  static getInstagramPosts() {
    return Promise.resolve({
      data: {
        getInstagramPosts: [
          {
            id: '1',
            media_url: '/static/images/instagram/post1.jpg',
            permalink: '#',
            caption: 'Sample Instagram post for portfolio',
          },
          {
            id: '2',
            media_url: '/static/images/instagram/post2.jpg',
            permalink: '#',
            caption: 'Another sample post',
          }
        ]
      }
    });
  }

  // Notifications
  static getNotifications() {
    return Promise.resolve({
      data: {
        getNotifications: []
      }
    });
  }

  // Channels
  static getChannels() {
    return Promise.resolve({
      data: {
        getChannels: []
      }
    });
  }

  // Orders
  static getOrders() {
    return Promise.resolve({
      data: {
        getOrders: []
      }
    });
  }

  // Promo codes
  static getPromoCodes() {
    return Promise.resolve({
      data: {
        getPromoCodes: []
      }
    });
  }

  // Auth queries - return static/demo responses
  static getUserEmail(_variables: { email: string }) {
    // For static version, always return success
    return Promise.resolve({
      data: {
        getUserEmail: {
          success: true
        }
      }
    });
  }

  static login(variables: { email: string; password: string; auth?: any }) {
    // For static version, return a mock user
    return Promise.resolve({
      data: {
        login: {
          user: {
            id: '1',
            email: variables.email,
            firstName: 'Demo',
            lastName: 'User',
            roles: [{ id: 1, name: 'customer' }]
          },
          token: 'demo-token'
        }
      }
    });
  }

  static loginWithGoogle(_variables: { token: string }) {
    return Promise.resolve({
      data: {
        loginWithGoogle: {
          success: true,
          user: {
            id: '1',
            email: 'demo@example.com',
            firstName: 'Demo',
            lastName: 'User'
          },
          token: 'demo-token'
        }
      }
    });
  }

  static register(variables: any) {
    return Promise.resolve({
      data: {
        register: {
          user: {
            id: '1',
            email: variables.email,
            firstName: variables.firstName,
            lastName: variables.lastName,
            roles: [{ id: 1, name: 'customer' }]
          },
          token: 'demo-token'
        }
      }
    });
  }

  static sendVerification() {
    return Promise.resolve({
      data: {
        sendVerification: {
          success: true
        }
      }
    });
  }

  static verifyUser(_variables: { token: string }) {
    return Promise.resolve({
      data: {
        verifyUser: {
          success: true
        }
      }
    });
  }

  static recoverUser(_variables: { email: string }) {
    return Promise.resolve({
      data: {
        recoverUser: {
          success: true
        }
      }
    });
  }

  static updateUserPassword(variables: any) {
    return Promise.resolve({
      data: {
        updateUserPassword: {
          id: '1',
          email: variables.email,
          token: 'demo-token',
          firstName: 'Demo',
          lastName: 'User',
          roles: [{ id: 1, name: 'customer' }]
        }
      }
    });
  }
}

export default StaticDataService;