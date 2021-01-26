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
      swipeToClose={true}
      onDidDismiss={() => setOpen(false)}
    >
      <Cropper
        openCvPath="./opencv/opencv.js"
        ref={cropperRef}
        image={file}
        maxHeight={window.innerHeight - 200}
      />

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
