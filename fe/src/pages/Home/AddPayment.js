import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Text from 'components/atoms/Text';
import RNPickerSelect from 'react-native-picker-select';

const AddPayment = () => {
  return (
    <ScrollView>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />
      <Text text="ha restituito i soldi a" />
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />
    </ScrollView>
  );
};

export default AddPayment;

const styles = StyleSheet.create({});
