import movementsSlice, * as fromMovements from "./movements";

describe("movements reducer", () => {
  it("should return initial state on first run", () => {
    const nextState = {
      ids: [],
      byId: {},
    };

    const result = movementsSlice.reducer(undefined, {});

    expect(result).toEqual(nextState);
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
