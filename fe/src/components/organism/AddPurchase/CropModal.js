import { IonButton, IonModal } from "@ionic/react";
import { ButtonsWrapper } from "pages/Movements";
import React, { useRef } from "react";
import Cropper from "react-perspective-cropper";

const CropModal = ({ open, file, processImage, onClose }) => {
  const cropperRef = useRef();

  const onDoneCropping = async () => {
    const res = await cropperRef.current.done({
      preview: false,
      filterCvParams: {
        thMeanCorrection: 13,
        thMode: window.cv.ADAPTIVE_THRESH_GAUSSIAN_C,
      },
    });
    processImage(res);
    onClose();
  };

  return (
    <IonModal
      className="ion-modal"
      isOpen={open}
      swipeToClose={false}
      onDidDismiss={onClose}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Cropper
          ref={cropperRef}
          image={file}
          maxHeight={window.innerHeight - 60}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: 20,
          zIndex: 999,
          left: "calc(50% - 110px)",
        }}
      >
        <ButtonsWrapper style={{ width: 110 }}>
          <IonButton color="danger" onClick={onClose} mode="md">
            Annulla
          </IonButton>
          <IonButton color="primary" onClick={onDoneCropping} mode="md">
            Ritaglia
          </IonButton>
        </ButtonsWrapper>
      </div>
    </IonModal>
  );
};

export default CropModal;
