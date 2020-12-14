import {
  IonCheckbox,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { getPeopleObj } from "store/app.reducer";
import { IonLabelContent } from "../MovementRow";

export const ProdRow = ({
  onDelete,
  onSingleAssignIntent,
  product,
  selectedRows,
  setSelectedRows,
}) => {
  const peopleObj = useSelector(getPeopleObj);
  const debtorsString = product?.debtors?.length
    ? product.debtors.map((d) => peopleObj[d].name).join(", ")
    : "";

  return (
    <IonItemSliding>
      <IonItemOptions side="start">
        <IonItemOption
          color="primary"
          onClick={() => onSingleAssignIntent(product.id)}
        >
          assegna
        </IonItemOption>
      </IonItemOptions>

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
              {debtorsString && <h3>Di: {debtorsString}</h3>}
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
