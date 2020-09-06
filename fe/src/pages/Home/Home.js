import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <Text size={50} style={styles.title}>
        Movimenti
      </Text>
      <Button label="aggiungi movimento" style={styles.addBtn} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 30},
  addBtn: {marginVertical: 20},
  title: {marginVertical: 30},
});
