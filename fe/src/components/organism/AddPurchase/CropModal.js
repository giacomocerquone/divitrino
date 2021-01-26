import { IonButton, IonModal } from "@ionic/react";
import PageContainer from "components/atoms/PageContainer";
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
          openCvPath="./opencv/opencv.js"
          ref={cropperRef}
          image={file}
          maxWidth={window.innerWidth - 15}
          maxHeight={window.innerHeight - 200}
        />
      </div>
      <PageContainer>
        <ButtonsWrapper>
          <IonButton color="danger" onClick={() => setOpen(false)}>
            Annulla
          </IonButton>
          <IonButton color="primary" onClick={onDoneCropping}>
            Ritaglia
          </IonButton>
        </ButtonsWrapper>
      </PageContainer>
    </IonModal>
  );
};

export default CropModal;
