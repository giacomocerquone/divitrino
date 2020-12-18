import { IonAlert } from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import promptsSlice from "reducers/prompts";
import { getAlertState } from "store/app.reducer";

const GenericAlert = () => {
  const alertState = useSelector(getAlertState);
  const dispatch = useDispatch();

  return (
    <IonAlert
      mode="ios"
      isOpen={!!alertState.message}
      onDidDismiss={() => dispatch(promptsSlice.actions.closeAlert())}
      header={alertState.header}
      message={alertState.message}
      inputs={alertState.inputs}
      buttons={alertState.buttons}
    />
  );
};

export default GenericAlert;
