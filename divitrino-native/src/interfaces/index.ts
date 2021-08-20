export interface Group {
  id: string;
}

export interface IUser {
  name: string;
  email: string;
  id: string;
  groups: Group[];
}

export interface IGroupOperation {
  payer: IUser;
  createdAt: string;
  amount: number;
}

export interface IPurchase extends IGroupOperation {}

export interface IPayment extends IGroupOperation {
  payee: IUser;
  description: string; // TODO a payment doesn't have a description
}

export type TMovement = IPayment & IPurchase;

export interface IProduct {
  price: string;
  name: string;
  debtors?: Partial<IUser>[];
}
