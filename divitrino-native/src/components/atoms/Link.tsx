import React, { FunctionComponent, ComponentProps } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import Text from "./Text";

const Link: FunctionComponent<Props> = ({
  label,
  onPress,
  textProps,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text text={label} underline {...textProps} />
    </TouchableOpacity>
  );
};

export default Link;

interface Props {
  onPress: TouchableOpacityProps["onPress"];
  label: string;
  textProps?: ComponentProps<typeof Text>;
  disabled?: boolean;
}
