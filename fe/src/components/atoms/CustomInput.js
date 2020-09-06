import React, {useRef, useEffect} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export default function CustomInput(props) {
  const {onChangeText, name, style, placeholder} = props;
  const inputRef = useRef(null);

  useEffect(() => {
    // FIXME: https://github.com/facebook/react-native/issues/29348
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.clear();
      }
    }, 100);
  }, []);

  const _onChangeText = (text) => {
    return (
      onChangeText && (name ? onChangeText(name, text) : onChangeText(text))
    );
  };

  return (
    <TextInput
      ref={inputRef}
      placeholderTextColor={'grey'}
      placeholder={placeholder}
      {...props}
      style={[styles.input, style]}
      underlineColorAndroid="transparent"
      onChangeText={_onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 18,
    color: '#060D26',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#f1f1f1',
  },
});
