import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
} from "@ionic/react";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import {
  checkmarkDoneOutline,
  personAddOutline,
  trashOutline,
} from "ionicons/icons";
import React from "react";
import { useDispatch } from "react-redux";
import promptsSlice from "reducers/prompts";

const Header = ({
  selectedRows,
  setSelectedRows,
  prods,
  setProds,
  setAssignModalOpen,
}) => {
  const dispatch = useDispatch();

  const onMultipleAssignIntent = () => {
    if (
      Object.keys(selectedRows).length &&
      Object.keys(selectedRows).every((key) => selectedRows[key])
    ) {
      setAssignModalOpen(true);
    } else {
      dispatch(
        promptsSlice.actions.openAlert({
          header: "Attenzione",
          message: "Seleziona dei prodotti per assegnarli a delle persone.",
        })
      );
    }
  };

  const onMultipleDeleteIntent = () => {
    if (
      Object.keys(selectedRows).length &&
      Object.keys(selectedRows).some((key) => selectedRows[key])
    ) {
      const idsToDelete = Object.keys(selectedRows).filter((key) => {
        return selectedRows[key];
      });
      const delProds = (prods) =>
        prods.filter((p) => !idsToDelete.find((id) => p.id === id));
      dispatch(
        promptsSlice.actions.openAlert({
          header: "Attenzione",
          message: "Sicuro di voler eliminare i prodotti selezionati?",
          buttons: [
            {
              text: "Annulla",
              role: "cancel",
              handler: () => null,
            },
            {
              text: "Elimina",
              handler: () => setProds((prods) => delProds(prods)),
            },
          ],
        })
      );
    } else {
      dispatch(
        promptsSlice.actions.openAlert({
          header: "Attenzione",
          message: "Seleziona dei prodotti per eliminarli.",
        })
      );
    }
  };

  const onSelectAll = () => {
    const newSelRows = prods.reduce((acc, p) => {
      acc[p.id] = true;
      return acc;
    }, {});
    setSelectedRows(newSelRows);
  };

  return (
    <IonHeader mode="ios">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton text="Indietro" default-href="/" />
        </IonButtons>
        <IonTitle>Aggiungi Acquisti</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={onSelectAll}>
            <IonIcon icon={checkmarkDoneOutline} />
          </IonButton>
          <IonButton onClick={onMultipleDeleteIntent}>
            <IonIcon icon={trashOutline} />
          </IonButton>
          <IonButton onClick={onMultipleAssignIntent}>
            <IonIcon icon={personAddOutline} />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
