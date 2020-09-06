import React from 'react';
import {StyleSheet, View} from 'react-native';
import Box from 'components/atoms/Box';
import Text from 'components/atoms/Text';

const defPayers = [
  {name: 'Danica', amount: '24,60'},
  {name: 'Raffale', amount: '16,40'},
];
const defPayee = {name: 'Giacomo', amount: '40'};

const PayeeReport = ({payee = defPayee, payers = defPayers}) => {
  return (
    <Box style={styles.container}>
      <View style={styles.row}>
        <Text>
          <Text weight="bold" text={payee.name} />
          <Text text=" riceve" />
        </Text>
        <Text text={`€ ${payee.amount}`} />
      </View>
      {payers.map((pr, i) => (
        <View key={i} style={styles.row}>
          <Text>
            <Text text="da" />
            <Text text={` ${pr.name}`} weight="bold" />
          </Text>
          <Text text={`€ ${pr.amount}`} />
        </View>
      ))}
    </Box>
  );
};

export default PayeeReport;

const styles = StyleSheet.create({
  container: {marginTop: 20},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
