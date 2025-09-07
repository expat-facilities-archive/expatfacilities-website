import { User } from "./user";

export type UserRole = {
  id: string;
  name: string;
};

export type UserInput = {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  auth: {
    googleId: string;
  };
};

export type DashboardPage = {
  currentUser?: User;
};
