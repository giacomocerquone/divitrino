import promptsSlice, * as fromPrompts from "./prompts";

describe("prompts reducer", () => {
  it("should return initial state on first run", () => {
    const initialState = {
      alert: {},
    };

    const result = promptsSlice.reducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it("should correctly set the alert state and get it", () => {
    const sampleAlertState = { test: "test" };

    const promptsState = promptsSlice.reducer(
      undefined,
      promptsSlice.actions.openAlert(sampleAlertState)
    );

    expect(fromPrompts.getAlertState(promptsState)).toEqual(sampleAlertState);
  });

  it("should correctly delete the alert state on close", () => {
    const sampleAlertState = { alert: { test: "test" } };

    const promptsState = promptsSlice.reducer(
      sampleAlertState,
      promptsSlice.actions.closeAlert()
    );

    expect(fromPrompts.getAlertState(promptsState)).toEqual({});
  });
});
