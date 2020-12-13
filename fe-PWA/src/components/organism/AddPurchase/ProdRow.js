import {
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { IonLabelContent } from "../MovementRow";

export const ProdRow = ({ onDelete, product }) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonLabel>
          <IonLabelContent>
            <div>
              <h2>{product.name}</h2>
              <h3>Di: Giacomo, Danica</h3>
            </div>
            <p>€ {product.price}</p>
          </IonLabelContent>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="danger" onClick={() => onDelete(product.id)}>
          elimina
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};
