import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import Text from 'components/atoms/Text';
import CustomInput from 'components/atoms/CustomInput';
import Button from 'components/atoms/Button';
import peopleSlice from 'reducers/people';
import {useNavigation} from '@react-navigation/native';

const AddPerson = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [name, setName] = useState('');
  return (
    <>
      <View style={styles.row}>
        <Text text="Nome" style={styles.label} />
        <CustomInput style={styles.input} onChangeText={setName} />
      </View>
      <Button
        label="salva"
        onPress={() => {
          dispatch(peopleSlice.actions.addPerson(name));
          navigate('People');
        }}
      />
    </>
  );
};

export default AddPerson;

const styles = StyleSheet.create({
  label: {marginRight: 10},
  row: {
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flex: 1,
    height: 50,
  },
});
