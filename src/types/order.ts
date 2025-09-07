import { Trip } from "./destinations";
import { PromoCode } from "./promo-code";
import { User } from "./user";

export enum OrderStatus {
  Created = "created",
  Cancelled = "cancelled",
  Completed = "completed",
}

export type Order = {
  id: string;
  trip: Trip;
  user: User;
  promoCode: PromoCode;
  status: OrderStatus;
  basePrice: number;
  finalPrice: number;
  createdAt: string;
};
