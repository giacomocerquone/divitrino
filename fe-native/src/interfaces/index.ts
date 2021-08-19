export interface Group {
  id: string;
}

export interface IUser {
  name: string;
  email: string;
  id: string;
  groups: Group[];
}

export interface IMovement {
  payer: IUser;
  createdAt: string;
}

export interface IPurchase extends IMovement {}

export interface IPayment extends IMovement {
  payee: IUser;
  description: string; // TODO a payment doesn't have a description
}
