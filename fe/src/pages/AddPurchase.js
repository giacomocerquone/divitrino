import {
  IonAlert,
  IonButton,
  IonContent,
  IonIcon,
  IonList,
  IonLoading,
  IonPage,
} from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import React, { useRef, useState } from "react";
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
import ocr from "utils/ocr";
import processOcr from "utils/processOcr";
import convertToCents from "utils/convertToCents";
import promptsSlice from "reducers/prompts";

const AddPurchase = ({ history }) => {
  const [prods, setProds] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const fileInput = useRef(null);

  const people = useSelector(getPeople);
  const dispatch = useDispatch();

  const onTakePic = async (e) => {
    try {
      setOcrLoading(true);
      const res = await ocr(e.target.files[0]);
      setProds((p) => [...p, ...processOcr(res)]);
    } catch (e) {
      console.log(e);
    } finally {
      setOcrLoading(false);
    }
  };

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

  const onSingleAssignIntent = (id, slidingRef) => {
    if (slidingRef) {
      slidingRef.close();
    }
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
          amount: prods.reduce((acc, p) => acc + convertToCents(p.amount), 0),
        })
      );

      const prodsToDispatch = prods.map((p) => {
        return {
          ...p,
          amount: convertToCents(p.amount),
          movementId,
        };
      });
      dispatch(productsSlice.actions.addProducts(prodsToDispatch));
      setProds([]);

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
                prods={prods}
                setProds={setProds}
                onDelete={onProdDelete}
                onSingleAssignIntent={onSingleAssignIntent}
              />
            ))}

            <NewProdRow setProds={setProds} />
          </IonList>
          <ButtonsWrapper>
            <IonButton
              htmlFor="camera-input"
              mode="ios"
              onClick={() => fileInput.current.click()}
              color="primary"
            >
              <IonIcon slot="start" icon={cameraOutline}></IonIcon>
              scontrino
            </IonButton>
            <input
              ref={fileInput}
              type="file"
              id="camera-input"
              hidden
              onChange={onTakePic}
              accept="image/*"
            />

            <IonButton
              mode="ios"
              disabled={!prods.length}
              onClick={() => {
                if (!prods.every((p) => p?.debtors?.length > 0)) {
                  dispatch(
                    promptsSlice.actions.openAlert({
                      header: "Attenzione",
                      message:
                        "Tutti i prodotti devono essere assegnati ad almeno una persona",
                    })
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
        <IonLoading
          mode="ios"
          isOpen={ocrLoading}
          onDidDismiss={() => setOcrLoading(false)}
          message={"Attendi..."}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddPurchase;
