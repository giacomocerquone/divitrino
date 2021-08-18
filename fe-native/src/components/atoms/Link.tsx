import React, { FunctionComponent, ComponentProps } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import Text from "./Text";

const Link: FunctionComponent<Props> = ({ label, onPress, textProps }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text text={label} underline {...textProps} />
    </TouchableOpacity>
  );
};

export default Link;

interface Props {
  onPress: TouchableOpacityProps["onPress"];
  label: string;
  textProps?: ComponentProps<typeof Text>;
}
