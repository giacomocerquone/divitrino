import React, { FunctionComponent } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { colors, unit } from "../../constants/ui";

const Input: FunctionComponent<Props> = (props) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style]}
      placeholderTextColor={colors.grey}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    textAlignVertical: "auto",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: unit * 2,
    paddingLeft: unit * 2,
    paddingTop: unit * 2,
    paddingBottom: unit * 2 - 1,
    fontFamily: "Poppins_500Medium",
    fontSize: 14,
    marginVertical: unit,
  },
});

interface Props extends TextInputProps {}
