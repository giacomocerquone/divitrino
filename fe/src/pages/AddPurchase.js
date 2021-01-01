import {
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
import AssignModal from "components/organism/AddPurchase/AssignModal";
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
import CropModal from "components/organism/AddPurchase/CropModal";

const AddPurchase = ({ history }) => {
  const [prods, setProds] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [file, setFile] = useState(false);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const fileInput = useRef(null);

  const people = useSelector(getPeople);
  const dispatch = useDispatch();

  const onTakePic = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setFile(reader.result);
        setCropModalOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const processImage = async (image) => {
    try {
      setOcrLoading(true);
      const res = await ocr(image);
      setProds((p) => [...p, ...processOcr(res)]);
    } catch (e) {
      console.log(e);
    } finally {
      setOcrLoading(false);
    }
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

  const addMovement = (payer, description) => {
    try {
      const movementId = uuidv4();
      dispatch(
        movementsSlice.actions.addMovement({
          id: movementId,
          payer,
          amount: prods.reduce((acc, p) => acc + convertToCents(p.amount), 0),
          description,
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

  const onAddDescription = (data) => {
    dispatch(
      promptsSlice.actions.openAlert({
        header: "Info",
        message: "Chi ha pagato?",
        inputs: [
          ...people.map((p) => ({
            name: p.name,
            label: p.name,
            type: "radio",
            value: p.id,
          })),
        ],
        buttons: [
          {
            text: "Annulla",
            role: "cancel",
            handler: () => null,
          },
          {
            text: "Aggiungi",
            handler: (payer) => addMovement(payer, data.description),
          },
        ],
      })
    );
  };

  const onAddButtonPressed = () => {
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

    dispatch(
      promptsSlice.actions.openAlert({
        header: "Descrizione",
        message: "Aggiungi una descrizione",
        inputs: [
          {
            name: "description",
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
            handler: (data) => setTimeout(() => onAddDescription(data), 300),
          },
        ],
      })
    );
  };

  return (
    <IonPage>
      <Header
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        prods={prods}
        setProds={setProds}
        setAssignModalOpen={setAssignModalOpen}
      />
      <IonContent fullscreen>
        <PageContainer>
          <IonList>
            {prods.map((p) => (
              <ProdRow
                setAssignModalOpen={setAssignModalOpen}
                selectedRows={selectedRows}
                setSelectedRows={setSelectedRows}
                key={p.id}
                product={p}
                prods={prods}
                setProds={setProds}
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
              onClick={onAddButtonPressed}
              color="success"
            >
              Aggiungi
            </IonButton>
          </ButtonsWrapper>
        </PageContainer>
        <AssignModal
          isOpen={assignModalOpen}
          onDone={onAssign}
          onClose={() => setAssignModalOpen(false)}
        />
        <IonLoading
          mode="ios"
          isOpen={ocrLoading}
          onDidDismiss={() => setOcrLoading(false)}
          message={"Attendi..."}
        />
        <CropModal
          open={cropModalOpen}
          setOpen={setCropModalOpen}
          file={file}
          processImage={processImage}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddPurchase;
