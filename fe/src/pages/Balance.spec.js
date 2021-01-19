import Dinero from "dinero.js";

import { equalize } from "../pages/Balance";

describe("Balance page", () => {
  it("should correctly equalize a person's balance by id", () => {
    const id = "A";
    const debts = {
      A: { B: Dinero({ amount: 10 }), C: Dinero() },
      B: { A: Dinero(), C: Dinero({ amount: 20 }) },
      C: { A: Dinero({ amount: 30 }), B: Dinero() },
    };
    const dispatch = jest.fn();

    const result = equalize(id, debts, dispatch);

    const payments = [
      { id: expect.any(String), payer: "A", payee: "B", amount: 10 },
      { id: expect.any(String), payer: "C", payee: "A", amount: 30 },
    ];
    expect(result).toEqual(expect.arrayContaining(payments));
  });
});
