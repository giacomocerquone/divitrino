import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/atoms/Text';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text size={50} style={styles.title}>
        Spese
      </Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  title: {
    marginLeft: 30,
    marginTop: 10,
  },
});
