import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';

const people = ['Giacomo', 'Danica', 'Raffaele'];

const People = () => {
  const {navigate} = useNavigation();
  return (
    <View style={styles.container}>
      {people.map((g, i) => (
        <>
          <View key={i} style={{marginLeft: 20}}>
            <View style={[styles.row, styles.groupItem]}>
              <Text text={g} />
            </View>
          </View>
        </>
      ))}
      <Button
        label="aggiungi persona"
        onPress={() => navigate('AddPerson')}
        style={styles.addBtn}
      />
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 30},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingVertical: 15,
  },
  addBtn: {
    marginTop: 20,
  },
});
