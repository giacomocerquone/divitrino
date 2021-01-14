import peopleSlice, * as fromPeople from "./people";

describe("people reducer", () => {
  it("should return initial state on first run", () => {
    const initialState = {
      ids: [],
      byId: {},
    };

    const result = peopleSlice.reducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it("should correctly: add a person, get the people, get one person by id", () => {
    const samplePerson = { id: "id", name: "me" };

    const peopleState = peopleSlice.reducer(
      undefined,
      peopleSlice.actions.addPerson(samplePerson)
    );

    expect(fromPeople.getPersonById(peopleState, "id")).toEqual(samplePerson);
    expect(fromPeople.getPeople(peopleState)).toEqual([samplePerson]);
  });

  it("should correctly delete a person", () => {
    const movState = {
      ids: ["id"],
      byId: {
        id: { id: "id", name: "me" },
      },
    };

    const peopleState = peopleSlice.reducer(
      movState,
      peopleSlice.actions.delPerson("id")
    );

    expect(fromPeople.getPersonById(peopleState, "id")).toBe(undefined);
    expect(fromPeople.getPeople(peopleState)).toEqual([]);
  });
});
