import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
} from "@ionic/react";
import { IonTitle, IonToolbar } from "components/atoms/CustomIon";
import PageContainer from "components/atoms/PageContainer";
import React, { useState } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { cameraOutline, personAddOutline } from "ionicons/icons";
import NewProdRow from "components/organism/AddPurchase/NewProdRow";
import { ProdRow } from "components/organism/AddPurchase/ProdRow";
import { ButtonsWrapper } from "./Movements";
import AssignModal from "components/organism/AssignModal";
import { useDispatch, useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";
import movementsSlice from "reducers/movements";
import { v4 as uuidv4 } from "uuid";
import Dinero from "dinero.js";

const { Camera } = Plugins;

const AddPurchase = ({ history }) => {
  const [prods, setProds] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignWarningOpen, setAssignWarningOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const people = useSelector(getPeople);
  const dispatch = useDispatch();

  const onTakePic = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    // imageElement.src = imageUrl;
  };

  const onMultipleAssignIntent = () => {
    if (
      Object.keys(selectedRows).length &&
      Object.keys(selectedRows).every((key) => selectedRows[key])
    ) {
      setAssignModalOpen(true);
    } else {
      setAssignWarningOpen(true);
    }
  };

  const onSingleAssignIntent = (id) => {
    setSelectedRows({ [id]: true });
    setAssignModalOpen(true);
  };

  const onProdDelete = async (id) => {
    setProds((p) => p.filter((item) => item.id !== id));
  };

  const onAssign = (selectedPeople) => {
    console.log("assigned", selectedPeople, selectedRows);
    alert("assigned");
    setSelectedRows({});
  };

  const onAddMovement = (payer) => {
    const movementId = uuidv4();
    dispatch(
      movementsSlice.actions.addMovement({
        id: movementId,
        payer,
        // amount: Dinero({
        //   amount: parseInt(amount.replace(",", "").replace(".", ""), 10),
        // }),
      })
    );
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader mode="ios">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Indietro" default-href="/" />
          </IonButtons>
          <IonTitle>Aggiungi Spesa</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onMultipleAssignIntent}>
              <IonIcon icon={personAddOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <PageContainer>
          <IonList>
            {prods.map((p) => (
              <ProdRow
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                key={p.id}
                product={p}
                onDelete={onProdDelete}
                onSingleAssignIntent={onSingleAssignIntent}
              />
            ))}

            <NewProdRow setProds={setProds} />
          </IonList>
          <ButtonsWrapper>
            <IonButton mode="ios" onClick={onTakePic} color="primary">
              <IonIcon slot="start" icon={cameraOutline}></IonIcon>
              scontrino
            </IonButton>
            <IonButton
              mode="ios"
              disabled={!prods.length}
              onClick={() => setConfirmModalOpen(true)}
              color="success"
            >
              Aggiungi spesa
            </IonButton>
          </ButtonsWrapper>
        </PageContainer>
        <AssignModal
          isOpen={assignModalOpen}
          onDone={onAssign}
          onClose={() => setAssignModalOpen(false)}
        />
        <IonAlert
          mode="ios"
          isOpen={assignWarningOpen}
          onDidDismiss={() => setAssignWarningOpen(false)}
          header="Attenzione"
          message="Bisogna selezionare dei prodotti per assegnarli a delle persone."
        />
        <IonAlert
          mode="ios"
          isOpen={confirmModalOpen}
          onDidDismiss={() => setConfirmModalOpen(false)}
          header="Info"
          message="Chi ha pagato?"
          inputs={[
            ...people.map((p) => ({
              name: p.name,
              label: p.name,
              type: "radio",
              value: p.id,
            })),
          ]}
          buttons={[
            {
              text: "Annulla",
              role: "cancel",
              handler: () => null,
            },
            {
              text: "Aggiungi",
              handler: onAddMovement,
            },
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddPurchase;
