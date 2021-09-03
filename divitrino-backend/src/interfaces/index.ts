export type TUserId = string;
export type TBalance = Record<TUserId, Record<TUserId, number | null>>;

export type TProduct = {
  name: string;
  pricePerDebtor: number;
  debtors: string[];
};

export interface IPaymentBody {
  amount: number;
  payerId: string;
  payeeId: string;
  groupId: string;
  date: string;
}

export interface IPurchaseBody {
  description: string;
  payerId: string;
  products: TProduct[];
  groupId: string;
  date: string;
}

export interface IBalanceQueryString {
  groupId: string;
}

export interface IMovementsQueryString {
  groupId: string;
}

export interface IProductsPurchaseQueryString {
  purchaseId: string;
}
