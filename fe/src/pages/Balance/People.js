import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getPeople} from 'store/app.reducer';

const People = () => {
  const {navigate} = useNavigation();
  const people = useSelector(getPeople);
  return (
    <>
      {people.map((g, i) => (
        <View key={i} style={styles.groupItem}>
          <Text text={g} />
        </View>
      ))}
      <Button
        label="aggiungi persona"
        onPress={() => navigate('AddPerson')}
        style={styles.addBtn}
      />
    </>
  );
};

export default People;

const styles = StyleSheet.create({
  groupItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  addBtn: {
    marginTop: 20,
  },
});
