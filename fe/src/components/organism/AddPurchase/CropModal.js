import { IonButton, IonModal } from "@ionic/react";
import { ButtonsWrapper } from "pages/Movements";
import React, { useRef } from "react";
import Cropper from "react-perspective-cropper";

const CropModal = ({ open, setOpen, file, processImage }) => {
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
    setOpen(false);
  };

  return (
    <IonModal
      className="ion-modal"
      isOpen={open}
      swipeToClose={false}
      onDidDismiss={() => setOpen(false)}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Cropper
          ref={cropperRef}
          image={file}
          maxHeight={window.innerHeight - 10}
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
        <ButtonsWrapper>
          <IonButton color="danger" onClick={() => setOpen(false)}>
            Annulla
          </IonButton>
          <IonButton color="primary" onClick={onDoneCropping}>
            Ritaglia
          </IonButton>
        </ButtonsWrapper>
      </div>
    </IonModal>
  );
};

export default CropModal;
