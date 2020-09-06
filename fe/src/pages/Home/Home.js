import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Text from 'components/atoms/Text';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Text size={50} style={styles.title}>
        Spese
      </Text>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 30},
  title: {
    marginTop: 10,
  },
});
