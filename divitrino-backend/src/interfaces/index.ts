export type TUserId = string;
export type TBalance = Record<TUserId, Record<TUserId, number | null>>;

export type TProduct = {
  name: string;
  pricePerDebtor: number;
  debtors: string[];
};

export type TProductPrisma = {
  name: string;
  pricePerDebtor: number;
  debtors: {
    connect: { id: string }[];
  };
};

export interface IBalanceQueryString {
  groupId: string;
}

export interface IMovementsQueryString {
  groupId: string;
  size?: number;
  page?: number;
}

export interface IProductsQueryString {
  movementId: string;
}

export interface IMovement {
  groupId: string;
  date: string;
  payerId: string;
}

export interface IPurchase extends IMovement {
  products: TProduct[];
  description: string;
}

export interface IPurchasePrisma extends IMovement {
  products: {
    create: TProductPrisma[];
  };
  description: string;
}

export interface IPayment extends IMovement {
  payeeId: string;
  amount: number;
}
