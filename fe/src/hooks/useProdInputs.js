import React, { useRef } from "react";
import { IonInput } from "@ionic/react";

const useProdInputs = ({ nameProps, priceProps, submit }) => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);

  return {
    NameInput: (
      <IonInput
        ref={nameRef}
        onKeyPress={(e) => e.key === "Enter" && priceRef.current.setFocus()}
        autocorrect
        autocapitalize
        {...nameProps}
      />
    ),
    PriceInput: (
      <IonInput
        ref={priceRef}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            if (submit) {
              submit();
            }
            nameRef.current.setFocus();
          }
        }}
        {...priceProps}
      />
    ),
  };
};

export default useProdInputs;
