import React, { FunctionComponent, useRef, useEffect } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

import { colors, unit } from "../../constants/ui";

const Input: FunctionComponent<Props> = ({ focused, ...props }) => {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (focused) {
      inputRef?.current?.focus();
    }
  }, [focused]);

  return (
    <TextInput
      ref={inputRef}
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
    paddingVertical: unit * 2,
    fontSize: 14,
    marginVertical: unit,
  },
});

interface Props extends TextInputProps {
  focused?: boolean;
}
