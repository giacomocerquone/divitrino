import { format } from "date-fns";
import { it } from "date-fns/locale";
import React, { FunctionComponent } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { colors } from "../../constants/ui";
import { TMovement } from "../../interfaces";
import BottomSheetContent from "../../templates/BottomSheetContent";
import Text from "../atoms/Text";

const MovementDetail: FunctionComponent<Props> = ({ movement }) => {
  if (!movement) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <ActivityIndicator size="large" color={colors.purple} />
      </View>
    );
  }
  return (
    <BottomSheetContent headerTitle={movement.description}>
      <Text size="s">
        <Text text="Totale" />
        <Text text={`€ ${movement.amount}`} weight="bold" />
      </Text>
      <Text size="s">
        <Text text="Pagato da" />
        <Text text={movement.payer.name} weight="bold" />
      </Text>
      <Text size="s">
        <Text text="Data" />
        <Text
          text={format(new Date(movement.createdAt), "dd MMMM", { locale: it })}
          weight="bold"
        />
      </Text>
    </BottomSheetContent>
  );
};

export default MovementDetail;

const styles = StyleSheet.create({});

interface Props {
  movement?: TMovement;
}
