export type PromoCode = {
  id: string;
  code: string;
  active: boolean;
  used: number;
  discount: number;
  expirationDate: Date;
  createdAt: Date;
};
