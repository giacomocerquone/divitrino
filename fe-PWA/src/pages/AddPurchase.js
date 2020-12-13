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
import PeopleAlertSelection from "components/organism/PeopleAlertSelection";

const { Camera } = Plugins;

const AddPurchase = () => {
  const [prods, setProds] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

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

  const openActionSheet = () => {
    if (Object.keys(selectedRows).length) {
      setSheetOpen(true);
    } else {
      setAlertOpen(true);
    }
  };

  const onProdDelete = async (id) => {
    setProds((p) => p.filter((item) => item.id !== id));
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
            <IonButton onClick={openActionSheet}>
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
              onClick={() => null}
              color="success"
            >
              Aggiungi spesa
            </IonButton>
          </ButtonsWrapper>
        </PageContainer>
        <PeopleAlertSelection
          isOpen={sheetOpen}
          close={() => setSheetOpen(false)}
        />
        <IonAlert
          mode="ios"
          isOpen={alertOpen}
          onDidDismiss={() => setAlertOpen(false)}
          header="Attenzione"
          message="Bisogna selezionare dei prodotti per assegnarli a delle persone."
        />
      </IonContent>
    </IonPage>
  );
};

export default AddPurchase;
