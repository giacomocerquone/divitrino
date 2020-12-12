import CustomInput from 'components/atoms/CustomInput';
import Text from 'components/atoms/Text';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const InputBox = ({style, onChangeText, placeholder, value, label}) => {
  return (
    <View style={[style]}>
      <Text text={label} weight="bold" color="#99979E" size={16} />
      <CustomInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
      />
    </View>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  input: {
    paddingTop: 15,
    paddingBottom: 5,
    height: 50,
    fontWeight: 'bold',
  },
});
