import React from 'react';
import {Text as T} from 'react-native';

export default function Text({
  text = '',
  tKey,
  style,
  color,
  size,
  onPress,
  underline,
  lineHeight,
  uppercase,
  align,
  weight,
  children,
}) {
  return (
    <T
      allowFontScaling={false}
      onPress={onPress}
      style={[
        {
          fontWeight: weight,
          textAlign: align || 'left',
          color: color || '#060D26',
          fontSize: size || 18,
          ...(lineHeight && {lineHeight}),
          ...(underline
            ? {
                textDecorationLine: 'underline',
                textDecorationColor: color || '#000',
              }
            : {}),
        },
        style,
      ]}>
      {text && (uppercase ? text.toUpperCase() : text)}
      {children}
    </T>
  );
}
