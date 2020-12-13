import { IonAlert } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";

const PeopleAlertSelection = ({ isOpen, close }) => {
  const people = useSelector(getPeople);

  return (
    <IonAlert
      mode="ios"
      isOpen={isOpen}
      onDidDismiss={close}
      header="Assegna"
      subHeader="Assegna i prodotti selezionati a delle persone"
      inputs={[
        ...people.map((p) => ({
          name: p.name,
          label: p.name,
          type: "checkbox",
          value: p.id,
        })),
      ]}
      buttons={[
        {
          text: "Annulla",
          role: "cancel",
          handler: () => {
            console.log("Confirm Cancel");
          },
        },
        {
          text: "Fatto",
          handler: (a) => {
            console.log(a);
          },
        },
      ]}
    />
  );
};

export default PeopleAlertSelection;
