import React, { FunctionComponent, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import { colors, unit } from "../../constants/ui";
import Text from "../atoms/Text";

const PageHeader: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <View style={styles.header}>
      <Text size="m" weight="normal" text={title} style={styles.headerTitle} />
      {children}
    </View>
  );
};

export default PageHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.darkerWhite,
    alignItems: "center",
    paddingTop: unit * 6,
    paddingBottom: unit * 2,
    marginBottom: unit * 4,
  },
  headerTitle: {
    marginBottom: unit * 2,
  },
});

interface Props {
  title: string;
  children?: ReactNode;
}
