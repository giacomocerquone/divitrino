import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getPeopleObj } from "store/app.reducer";
import styled from "styled-components";
import Dinero from "dinero.js";

const ProductRow = ({ product }) => {
  const people = useSelector(getPeopleObj);

  const debtorNames = product.debtors.map((d) => people[d].name).join(", ");

  const price = useMemo(
    () => Dinero({ amount: product.amount, currency: "EUR" }),
    [product.amount]
  );

  return (
    <IonItem>
      <IonLabel>
        <IonLabelContent>
          <div>
            <h2>{product.name}</h2>
            <p>
              comprato da <b>{debtorNames}</b>
            </p>
          </div>
          <Amount>{price.toFormat("$0,0.00")}</Amount>
        </IonLabelContent>
      </IonLabel>
    </IonItem>
  );
};

export default ProductRow;

export const IonLabelContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Amount = styled.p`
  font-weight: bold;
`;

export const CustomIonAvatar = styled(IonAvatar)`
  --border-radius: 0;
`;
