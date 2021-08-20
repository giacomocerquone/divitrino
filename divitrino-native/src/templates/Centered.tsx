import React, { FunctionComponent, ReactNode } from "react";
import { StyleSheet, View } from "react-native";

import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import Text from "../components/atoms/Text";
import { unit } from "../constants/ui";

const Centered: FunctionComponent<Props> = ({
  title,
  description,
  children,
  onPrimary,
  onSecondary,
  primaryText,
  secondaryText,
  disabled,
}) => {
  return (
    <View style={styles.root}>
      {/* TODO image */}
      <Text size="xl" weight="normal" text={title} />
      <Text align="center" style={styles.description}>
        {description}
      </Text>
      <View style={{ alignSelf: "stretch" }}>
        {children}
        <Button
          onPress={onPrimary}
          label={primaryText}
          style={styles.button}
          disabled={disabled}
        />
        {onSecondary && secondaryText && (
          <Link
            disabled={disabled}
            onPress={onSecondary}
            label={secondaryText}
            textProps={{
              align: "center",
              style: {
                marginTop: unit,
              },
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Centered;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: unit * 10,
  },
  description: { marginTop: unit * 4, marginBottom: unit * 8 },
  button: {
    marginTop: unit * 4,
  },
});

interface Props {
  disabled?: boolean;
  children: ReactNode;
  title: string;
  description: string;
  onPrimary: () => void;
  onSecondary?: () => void;
  primaryText: string;
  secondaryText?: string;
}
