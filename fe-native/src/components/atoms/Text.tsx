import React, { FunctionComponent, ReactNode } from "react";
import { Text as RNText, TextStyle } from "react-native";

type size = "xs" | "s" | "m" | "l" | "xl";

type weight = "light" | "normal" | "bold";

const sizesMap: Record<size, TextStyle["fontSize"]> = {
  xs: 14,
  s: 16,
  m: 18,
  l: 22,
  xl: 28,
};

const familyWeightsMap: Record<weight, string> = {
  light: "Poppins_400Regular",
  normal: "Poppins_500Medium",
  bold: "Poppins_600SemiBold",
};

const Text: FunctionComponent<Props> = ({
  children,
  size = "s",
  text,
  weight = "light",
  transform,
  underline,
  color = "#000",
  align,
  lineHeight,
  style,
}) => {
  return (
    <RNText
      style={{
        fontSize: sizesMap[size],
        textTransform: transform || "none",
        textDecorationLine: underline ? "underline" : "none",
        color,
        fontFamily: familyWeightsMap[weight],
        textAlign: align || "auto",
        lineHeight,
        ...style,
      }}
    >
      {text || children}
    </RNText>
  );
};

export default Text;

interface Props {
  children?: ReactNode;
  size?: size;
  text?: string;
  weight?: weight;
  transform?: TextStyle["textTransform"];
  underline?: boolean;
  color?: string;
  align?: TextStyle["textAlign"];
  lineHeight?: TextStyle["lineHeight"];
  style?: TextStyle;
}
