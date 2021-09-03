import { useNavigation } from "@react-navigation/core";
import React, { FunctionComponent, ReactNode, useState } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import IconButton from "../components/atoms/IconButton";
import Text from "../components/atoms/Text";
import { colors, unit } from "../constants/ui";
import NewPayment from "./NewPayment";
import NewPurchase from "./NewPurchase";

type TabsNames = "Payment" | "Purchase";

const Tab: FunctionComponent<{
  onPress: () => void;
  name: string;
  active: boolean;
}> = ({ onPress, name, active }) => {
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[
          active && { borderBottomWidth: 2, borderBottomColor: colors.purple },
        ]}
        onPress={onPress}
      >
        <Text
          weight={active ? "normal" : "light"}
          text={name}
          color={active ? colors.purple : undefined}
          style={{ paddingBottom: unit * 3 }}
          align="center"
        />
      </TouchableOpacity>
    </View>
  );
};

const TabsComponents: Record<TabsNames, ReactNode> = {
  Payment: NewPayment,
  Purchase: NewPurchase,
};

const NewMovement = () => {
  const [activeTab, setActiveTab] = useState<TabsNames>("Purchase");
  const { goBack } = useNavigation();

  const Scene = TabsComponents[activeTab];

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: unit * 5 }}>
      <IconButton
        name="close"
        style={{ alignSelf: "flex-end" }}
        onPress={goBack}
      />

      <View style={styles.header}>
        <Tab
          name="Acquisto"
          onPress={() => setActiveTab("Purchase")}
          active={activeTab === "Purchase"}
        />
        <Tab
          name="Pagamento"
          onPress={() => setActiveTab("Payment")}
          active={activeTab === "Payment"}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Scene />
      </View>
    </SafeAreaView>
  );
};

export default NewMovement;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingVertical: unit * 6,
    alignItems: "center",
  },
});
