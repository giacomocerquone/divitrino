import { IonButton, IonModal } from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
import { ButtonsWrapper } from "pages/Movements";
import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import getCroppedImg from "utils/getCroppedImg";

const CropModal = ({ open, setOpen, file, processImage }) => {
  const [crop, setCrop] = useState({ unit: "%", width: 30 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onDoneCropping = async () => {
    const res = await getCroppedImg(file, completedCrop, "asd.jpg");
    setOpen(false);
    processImage(res);
  };

  return (
    <IonModal
      isOpen={open}
      swipeToClose={true}
      onDidDismiss={() => setOpen(false)}
    >
      <ReactCrop
        src={file}
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      />

      <PageContainer>
        <ButtonsWrapper>
          <IonButton color="danger" onClick={() => setOpen(false)}>
            Annulla
          </IonButton>
          <IonButton
            color="primary"
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={onDoneCropping}
          >
            Ritaglia
          </IonButton>
        </ButtonsWrapper>
      </PageContainer>
    </IonModal>
  );
};

export default CropModal;
