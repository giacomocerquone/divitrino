import movementsSlice, * as fromMovements from "./movements";

describe("movements reducer", () => {
  it("should return initial state on first run", () => {
    const initialState = {
      ids: [],
      byId: {},
    };

    const result = movementsSlice.reducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it("should correctly: add a movement, get the movements, get one movement by id", () => {
    const sampleMovement = { id: "id", payer: "me", payee: "you" };

    const movementsState = movementsSlice.reducer(
      undefined,
      movementsSlice.actions.addMovement(sampleMovement)
    );

    expect(fromMovements.getMovementById(movementsState, "id")).toEqual(
      sampleMovement
    );
    expect(fromMovements.getMovements(movementsState)).toEqual([
      sampleMovement,
    ]);
  });

  it("should correctly: add multiple movements, get the movements", () => {
    const sampleMovements = [
      { id: "id1", payer: "me", payee: "you" },
      { id: "id2", payer: "me", payee: "you" },
    ];

    const movementsState = movementsSlice.reducer(
      undefined,
      movementsSlice.actions.addMovements(sampleMovements)
    );

    expect(fromMovements.getMovements(movementsState)).toEqual(
      expect.arrayContaining(sampleMovements)
    );
  });

  it("should correctly delete a movement", () => {
    const movState = {
      ids: ["id"],
      byId: {
        id: { id: "id", payer: "me", payee: "you" },
      },
    };

    const movementsState = movementsSlice.reducer(
      movState,
      movementsSlice.actions.delMovement("id")
    );

    expect(fromMovements.getMovementById(movementsState, "id")).toBe(undefined);
    expect(fromMovements.getMovements(movementsState)).toEqual([]);
  });
});
