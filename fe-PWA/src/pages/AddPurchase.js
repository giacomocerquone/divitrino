import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonList,
  IonPage,
} from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import React, { useState } from "react";
import { Plugins, CameraResultType } from "@capacitor/core";
import { cameraOutline } from "ionicons/icons";
import NewProdRow from "components/organism/AddPurchase/NewProdRow";
import { ProdRow } from "components/organism/AddPurchase/ProdRow";
import { ButtonsWrapper } from "./Movements";
import AssignModal from "components/organism/AssignModal";
import { useDispatch, useSelector } from "react-redux";
import { getPeople } from "store/app.reducer";
import movementsSlice from "reducers/movements";
import { v4 as uuidv4 } from "uuid";
import productsSlice from "reducers/products";
import Header from "components/organism/AddPurchase/Header";

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

  const onAssign = (debtors) => {
    const modProds = prods.map((p) => {
      if (selectedRows[p.id]) {
        return {
          ...p,
          debtors,
        };
      }
      return p;
    });

    setProds(modProds);
    setSelectedRows({});
  };

  const onAddMovement = (payer) => {
    try {
      const movementId = uuidv4();
      dispatch(
        movementsSlice.actions.addMovement({
          id: movementId,
          payer,
          amount: prods.reduce((acc, p) => acc + p.amount, 0), // They're already stored as cents
        })
      );

      const prodsToDispatch = prods.map((p) => {
        return {
          ...p,
          movementId,
        };
      });
      dispatch(productsSlice.actions.addProducts(prodsToDispatch));

      history.goBack();
    } catch (e) {
      // TODO handle error
    }
  };

  return (
    <IonPage>
      <Header onMultipleAssignIntent={onMultipleAssignIntent} />
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
              onClick={() => {
                if (!prods.every((p) => p?.debtors?.length > 0)) {
                  alert(
                    "Tutti i prodotti devono essere assegnati ad almeno una persona"
                  );
                  return;
                }
                setConfirmModalOpen(true);
              }}
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
          message="Seleziona dei prodotti per assegnarli a delle persone."
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
