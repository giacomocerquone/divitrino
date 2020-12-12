import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import Button from 'components/atoms/Button';
import peopleSlice from 'reducers/people';
import {useNavigation} from '@react-navigation/native';
import 'react-native-get-random-values';
import InputBox from 'components/organism/InputBox';

const uuidv4 = () => Math.random();

const AddPerson = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  const [name, setName] = useState('');
  return (
    <>
      <InputBox
        style={styles.input}
        onChangeText={setName}
        placeholder="Mario Rossi"
        value={name}
        label="Nome"
      />
      <Button
        label="salva"
        onPress={() => {
          dispatch(peopleSlice.actions.addPerson({name, id: uuidv4()}));
          navigate('People');
        }}
      />
    </>
  );
};

export default AddPerson;

const styles = StyleSheet.create({
  input: {
    marginVertical: 30,
  },
});
