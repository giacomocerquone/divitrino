import { IonTitle as ITitle, IonToolbar as IToolbar, IonSelectOption as ISelectOption } from "@ionic/react";
import styled from "styled-components";

export const IonToolbar = styled(IToolbar)`
  --border-width: 0 !important;
  padding-bottom: 10px;
`;

export const IonTitle = styled(ITitle)`
  font-weight: normal;
`;

export const IonSelectOption = styled(ISelectOption)`
  font-weight: bold;
`;
