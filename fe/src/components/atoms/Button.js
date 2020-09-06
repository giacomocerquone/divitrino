import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from 'components/atoms/Text';

const Button = ({label, onPress, style, Icon}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      {Icon}
      <Text
        text={label}
        color="#fff"
        uppercase
        weight="bold"
        size={16}
        align="center"
      />
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#1132D6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    flexDirection: 'row',
  },
});
