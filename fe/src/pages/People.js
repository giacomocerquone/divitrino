import React from "react";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import { useDispatch, useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import peopleSlice from "reducers/people";
import promptsSlice from "reducers/prompts";
import { v4 as uuidv4 } from "uuid";

const People = () => {
  const people = useSelector(getPeople);
  const dispatch = useDispatch();

  const onAdd = (data) => {
    const alreadyExist = people.some((p) => p.name === data.name);
    if (alreadyExist || !data.name) {
      setTimeout(() => {
        dispatch(
          promptsSlice.actions.openAlert({
            header: "Nome esistente",
            message: "Già esiste una persona con questo nome",
          })
        );
      }, 300);
      return;
    }
    dispatch(peopleSlice.actions.addPerson({ name: data.name, id: uuidv4() }));
  };

  const openAddPersonModal = () => {
    dispatch(
      promptsSlice.actions.openAlert({
        header: "Aggiungi",
        message: "Aggiungi una persona",
        inputs: [
          {
            name: "name",
            label: "Nome",
            type: "text",
            value: "",
          },
        ],
        buttons: [
          {
            text: "Annulla",
            role: "cancel",
          },
          {
            text: "Fatto",
            handler: onAdd,
          },
        ],
      })
    );
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Indietro" default-href="/" />
          </IonButtons>
          <IonTitle>Persone</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PageContainer>
          <IonList style={{ flexGrow:1 }}>
            {people.map((p) => (
              <IonItemSliding key={p.id}>
                <IonItem>
                  <IonLabel>{p.name}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() =>
                      dispatch(peopleSlice.actions.delPerson(p.id))
                    }
                  >
                    elimina
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>

          <IonButton
            mode="ios"
            onClick={openAddPersonModal}
            color="primary"
            expand="block"
          >
            Aggiungi persona
          </IonButton>
        </PageContainer>
      </IonContent>
    </IonPage>
  );
};

export default People;
