import React, { ComponentProps, FunctionComponent } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import { colors, unit } from "../../constants/ui";
import Text from "./Text";

const Button: FunctionComponent<Props> = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.root,
        props.disabled && {
          backgroundColor: colors.lightPurple,
        },
        props.style,
      ]}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      {props.label && (
        <Text
          text={props.label}
          transform="uppercase"
          weight="bold"
          color={colors.white}
          {...props.textProps}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.purple,
    borderRadius: unit * 2,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: unit * 3,
  },
});

interface Props {
  textProps?: ComponentProps<typeof Text>;
  label?: string;
  style?: TouchableOpacityProps["style"];
  onPress: TouchableOpacityProps["onPress"];
  disabled?: boolean;
}
