import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getPeople} from 'store/app.reducer';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import peopleSlice from 'reducers/people';

const People = () => {
  const {navigate} = useNavigation();
  const people = useSelector(getPeople);
  const dispatch = useDispatch();
  return (
    <>
      {people.map((p) => (
        <View key={p.id} style={styles.person}>
          <Text text={p.name} />
          <TouchableOpacity
            onPress={() => dispatch(peopleSlice.actions.delPerson(p.id))}>
            <MaterialCommunityIcons
              name="minus-circle-outline"
              color="#C1004B"
              size={26}
            />
          </TouchableOpacity>
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
  person: {
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
