import { UserRole } from "./auth";

type Address = {
  firstName: string;
  lastName: string;
  streetAddress: string;
  city: string;
  zipCode: string;
  country: string;
};

export interface User {
  id: string;
  email: string;
  roles: UserRole[];
  status: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  phoneNumber: string;
  connections: {
    ip: string;
    device: string;
    support: string;
    createdAt: Date;
  }[];
  token?: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  preferences: {
    language: string;
    currency: string;
    theme: string;
  };
  deactivated: boolean;
  updatedAt?: Date;
  createdAt: Date;
}
