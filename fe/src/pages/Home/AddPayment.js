import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Text from 'components/atoms/Text';
import RNPickerSelect from 'react-native-picker-select';
import {useDispatch, useSelector} from 'react-redux';
import {getPeople} from 'store/app.reducer';
import InputBox from 'components/organism/InputBox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Button from 'components/atoms/Button';
import movementsSlice from 'reducers/movements';
import {useNavigation} from '@react-navigation/native';
import Dinero from 'dinero.js';

const payerPlaceholder = {label: 'Seleziona pagante'};
const payeePlaceholder = {label: 'Seleziona ricevente'};
const doneText = 'Seleziona';
const Icon = () => (
  <MaterialCommunityIcons
    name="arrow-right-bold"
    size={24}
    color="#060D26"
    style={styles.icon}
  />
);
const AddPayment = () => {
  const [payer, setPayer] = useState(null);
  const [payee, setPayee] = useState(null);
  const [amount, setAmount] = useState(null);
  const {navigate} = useNavigation();

  const dispatch = useDispatch();
  const people = useSelector(getPeople);
  const items = people.map((p) => ({label: p.name, value: p.id}));

  const onAdd = () => {
    dispatch(
      movementsSlice.actions.addMovement({
        id: uuidv4(),
        payer,
        payee,
        amount: Dinero({
          amount: parseInt(amount.replace(',', '').replace('.', ''), 10),
        }),
      }),
    );
    navigate('Home');
  };

  return (
    <View>
      <InputBox
        style={styles.input}
        onChangeText={setAmount}
        value={amount}
        label="Importo"
        placeholder="6.50"
        keyboardType="numeric"
      />
      <RNPickerSelect
        placeholder={payerPlaceholder}
        onValueChange={setPayer}
        value={payer}
        doneText={doneText}
        style={pickerStyles}
        Icon={Icon}
        items={
          payee
            ? people
                .filter((p) => p.id !== payee)
                .map((p) => ({label: p.name, value: p.id}))
            : items
        }
      />
      <Text text="ha restituito denaro a" weight="bold" style={styles.text} />
      <RNPickerSelect
        doneText={doneText}
        Icon={Icon}
        value={payee}
        style={pickerStyles}
        placeholder={payeePlaceholder}
        onValueChange={setPayee}
        items={
          payer
            ? people
                .filter((p) => p.id !== payer)
                .map((p) => ({label: p.name, value: p.id}))
            : items
        }
      />
      <Button label="aggiungi" onPress={onAdd} style={styles.button} />
    </View>
  );
};

export default AddPayment;

const styles = StyleSheet.create({
  input: {paddingVertical: 20},
  text: {marginVertical: 20},
  icon: {paddingVertical: 9},
  button: {marginTop: 20},
});

const pickerStyles = StyleSheet.create({
  placeholder: {
    fontSize: 16,
    paddingVertical: 12,
    paddingRight: 30,
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#060D26',
    paddingRight: 30,
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#060D26',
    paddingRight: 30,
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
});
