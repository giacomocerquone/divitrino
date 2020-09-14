import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Text from 'components/atoms/Text';

const Button = ({label, onPress, style, Icon, ghost}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, ghost && styles.ghost, style]}>
      {Icon}
      <Text
        text={label}
        color={ghost ? '#1132D6' : '#fff'}
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
  ghost: {
    backgroundColor: '#fff',
    borderColor: '#1132D6',
    borderWidth: 1,
  },
});
