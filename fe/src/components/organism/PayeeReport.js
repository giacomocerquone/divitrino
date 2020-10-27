import React from 'react';
import {StyleSheet, View} from 'react-native';
import Box from 'components/atoms/Box';
import Text from 'components/atoms/Text';
import {useSelector} from 'react-redux';
import {getPeople, newFunc} from 'store/app.reducer';

const SingleReport = ({p, isPayer = false}) => {
  const people = useSelector(getPeople);
  const newFuncObj = useSelector(newFunc);

  const result = people
    .map((person) => {
      if (person.id === p.id) {
        return;
      }
      const dinero = isPayer
        ? newFuncObj[p.id][person.id]
        : newFuncObj[person.id][p.id];
      if (dinero.getAmount() <= 0) {
        return;
      }

      return (
        <View key={person.id} style={styles.row}>
          <Text>
            {` - ${isPayer ? 'a' : 'da'} `}
            <Text text={person.name} weight="bold" />
            {`: ${dinero.toFormat('$0,0.00')}`}
          </Text>
        </View>
      );
    })
    .filter((el) => !!el);

  return result.length ? (
    result
  ) : (
    <Text size={16} text=" - Vuoto - " style={{opacity: 0.6}} />
  );
};

const PayeeReport = ({p}) => {
  return (
    <Box style={styles.container}>
      <View style={styles.row}>
        <Text>
          <Text weight="bold" text={p.name} />
          <Text text=" deve dare:" />
        </Text>
      </View>
      <SingleReport p={p} isPayer />

      <View style={[styles.row, {marginTop: 10}]}>
        <Text>
          <Text weight="bold" text={p.name} />
          <Text text=" deve ricevere:" />
        </Text>
      </View>
      <SingleReport p={p} />
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
