export interface IGroup {
  id: string;
  users: IUser[];
  name?: string;
}

export interface IUser {
  name: string;
  email: string;
  id: string;
  groups: IGroup[];
}

export type TBalance = Record<IUser["id"], Record<IUser["id"], number>>;

export interface IGroupOperation {
  id: string;
  payer: IUser;
  createdAt: string;
  date: string;
  amount: number;
}

export interface IPurchase extends IGroupOperation {
  description: string;
  products: IProduct[];
}

export interface IPayment extends IGroupOperation {
  payee: IUser;
}

export type TMovement = IPayment & IPurchase;

export interface IProduct {
  price: string;
  name: string;
  debtors: IUser["id"][] | IUser[];
}

export interface IAPIProduct {
  name: string;
  pricePerDebtor: number;
  debtors: string[];
}
