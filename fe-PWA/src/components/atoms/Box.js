import React from 'react';
import {StyleSheet, View} from 'react-native';

const Box = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Box;

const styles = StyleSheet.create({
  container: {backgroundColor: '#F1F1F1', padding: 20, borderRadius: 10},
});
