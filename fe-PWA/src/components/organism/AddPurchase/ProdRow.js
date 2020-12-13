import {
  IonCheckbox,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import React, { useState } from "react";
import { IonLabelContent } from "../MovementRow";
import PeopleChips from "../PeopleChips";

export const ProdRow = ({
  onDelete,
  product,
  selectedRows,
  setSelectedRows,
}) => {
  const [doubleTapped, setDoubleTapped] = useState(false);

  console.log(selectedRows);

  return (
    <IonItemSliding>
      <IonItem>
        <IonCheckbox
          slot="start"
          checked={selectedRows?.[product.id]}
          onClick={() =>
            setSelectedRows((rows) => ({
              ...rows,
              [product.id]: !rows[product.id],
            }))
          }
        />

        <IonLabel>
          <IonLabelContent>
            <div>
              <h2>{product.name}</h2>
              <h3>Di: Giacomo, Danica</h3>
            </div>
            <p>€ {product.price}</p>
          </IonLabelContent>
          {doubleTapped && <PeopleChips />}
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
