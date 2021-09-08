import React, { FunctionComponent, ReactNode } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import BackButton from "../components/atoms/BackButton";
import Button from "../components/atoms/Button";
import Link from "../components/atoms/Link";
import Text from "../components/atoms/Text";
import { unit } from "../constants/ui";

const hello = require("../../assets/hello.png");

const Centered: FunctionComponent<Props> = ({
  title,
  description,
  children,
  onPrimary,
  onSecondary,
  primaryText,
  secondaryText,
  disabled,
  hideBack,
  imgSource,
}) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{
          flex: 1,
        }}
      >
        <View style={styles.root}>
          <Image
            source={imgSource || hello}
            style={{ height: unit * 60 }}
            resizeMode="contain"
          />
          <View>
            <Text size="xl" weight="normal" text={title} align="center" />
            <Text align="center" style={styles.description}>
              {description}
            </Text>
          </View>
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
        {!hideBack && <BackButton />}
      </KeyboardAvoidingView>
    </ScrollView>
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
  children?: ReactNode;
  title: string;
  description: string;
  onPrimary: () => void;
  onSecondary?: () => void;
  primaryText: string;
  secondaryText?: string;
  hideBack?: boolean;
  imgSource?: any;
}
