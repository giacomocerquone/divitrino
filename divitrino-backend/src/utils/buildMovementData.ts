import {
  IPayment,
  IPurchase,
  IPurchasePrisma,
  TProductPrisma,
} from "../interfaces";

const buildMovementData: (
  mov: IPayment & IPurchase,
  addedByUserId: string
) => IPayment | IPurchasePrisma = (
  { description, payerId, products, groupId, date, payeeId, amount },
  addedByUserId
) => {
  if (payeeId) {
    return {
      addedByUserId,
      amount,
      payerId,
      payeeId,
      groupId,
      date,
    };
  }

  const prodsToCreate = products.reduce<TProductPrisma[]>((acc, prod) => {
    acc.push({
      name: prod.name,
      pricePerDebtor: prod.pricePerDebtor,
      debtors: {
        connect: prod.debtors.map((debtor) => ({ id: debtor })),
      },
    });

    return acc;
  }, []);

  return {
    addedByUserId,
    products: {
      create: prodsToCreate,
    },
    payerId,
    description,
    groupId,
    date,
  };
};

export default buildMovementData;
