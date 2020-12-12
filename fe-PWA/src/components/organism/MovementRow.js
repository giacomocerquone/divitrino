import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
import { getPersonById } from "store/app.reducer";
import styled from "styled-components";

const MovementRow = ({ movement }) => {
  const isPurchase = movement.payee;
  const payer = useSelector((state) => getPersonById(state, movement.payer));
  const payee = useSelector((state) => getPersonById(state, movement.payee));

  return (
    <IonItem>
      <IonAvatar slot="start">
        <img src="https://via.placeholder.com/150" alt="cibo" />
      </IonAvatar>
      <IonLabel>
        {isPurchase ? (
          <IonLabelContent>
            <p>
              <b>{payer.name}</b> ha pagato <b>{payee.name}</b>
            </p>

            <Amount>{`€ ${movement.amount.toFormat("0,0.00")}`}</Amount>
          </IonLabelContent>
        ) : (
          <IonLabelContent>
            <div>
              <h2>{movement.description} </h2>
              <p>{`pagato da ${payer.name}`}</p>
            </div>

            <Amount>{`€ ${movement.amount.toFormat("0,0.00")}`}</Amount>
          </IonLabelContent>
        )}
      </IonLabel>
    </IonItem>
  );
};

export default MovementRow;

const IonLabelContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Amount = styled.p`
  font-weight: bold;
`;
