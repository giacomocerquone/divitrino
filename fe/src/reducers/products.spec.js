import productsSlice, * as fromProducts from "./products";

describe("products reducer", () => {
  it("should return initial state on first run", () => {
    const initialState = {
      ids: [],
      byId: {},
    };

    const result = productsSlice.reducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it("should correctly: add a product, get the products, get one product by id, get all the products of a movement", () => {
    const sampleProducts = [
      { id: "id1", name: "me", movementId: "1" },
      { id: "id2", name: "you", movementId: "1" },
      { id: "id3", name: "him", movementId: "2" },
    ];

    const productsState = productsSlice.reducer(
      undefined,
      productsSlice.actions.addProducts(sampleProducts)
    );

    expect(fromProducts.getProductById(productsState, "id1")).toEqual(
      sampleProducts[0]
    );
    expect(fromProducts.getProducts(productsState)).toEqual(sampleProducts);
    expect(fromProducts.getMovementProducts(productsState, "1")).toEqual([
      sampleProducts[0],
      sampleProducts[1],
    ]);
  });
});
