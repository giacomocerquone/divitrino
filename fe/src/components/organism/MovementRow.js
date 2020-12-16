import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getPersonById } from "store/app.reducer";
import styled from "styled-components";
import movementIcon from "assets/movement.png";
import purchaseIcon from "assets/purchase.png";
import Dinero from "dinero.js";

const MovementRow = ({ movement }) => {
  const isPurchase = movement.payee;
  const payer = useSelector((state) => getPersonById(state, movement.payer));
  const payee = useSelector((state) => getPersonById(state, movement.payee));

  const amount = useMemo(
    () => Dinero({ amount: movement.amount, currency: "EUR" }),
    [movement.amount]
  );

  return (
    <IonItem>
      <CustomIonAvatar slot="start">
        <img src={isPurchase ? purchaseIcon : movementIcon} alt="cibo" />
      </CustomIonAvatar>
      <IonLabel>
        {isPurchase ? (
          <IonLabelContent>
            <p>
              <b>{payer.name}</b> ha pagato <b>{payee.name}</b>
            </p>

            <Amount>{amount.toFormat("$0,0.00")}</Amount>
          </IonLabelContent>
        ) : (
          <IonLabelContent>
            <div>
              <h2>{movement.description} </h2>
              <p>
                pagato da <b>{payer.name}</b>
              </p>
            </div>

            <Amount>{amount.toFormat("$0,0.00")}</Amount>
          </IonLabelContent>
        )}
      </IonLabel>
    </IonItem>
  );
};

export default MovementRow;

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
