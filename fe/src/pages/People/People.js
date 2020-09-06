import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const People = () => {
  return (
    <View style={styles.container}>
      <Text>People</Text>
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});
