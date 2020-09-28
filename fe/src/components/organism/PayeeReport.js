import React from 'react';
import {StyleSheet, View} from 'react-native';
import Box from 'components/atoms/Box';
import Text from 'components/atoms/Text';
import {useSelector} from 'react-redux';
import {getPeople, getPersonBalance} from 'store/app.reducer';

const PayeeReport = ({p}) => {
  const {alreadyReturned, toBeReturned} = useSelector((state) =>
    getPersonBalance(state, p.id),
  );
  const people = useSelector(getPeople);

  console.log({alreadyReturned, toBeReturned}, p.name);

  const payee = {
    name: p.name,
    amount: 40,
  };

  return (
    <Box style={styles.container}>
      <View style={styles.row}>
        <Text>
          <Text weight="bold" text={payee.name} />
          <Text text=" riceve" />
        </Text>
        <Text text={`€ ${payee.amount}`} />
      </View>
      {people.map(
        (person, i) =>
          person.id !== p.id && (
            <View key={i} style={styles.row}>
              <Text>
                <Text text="da" />
                <Text text={` ${person.name}`} weight="bold" />
              </Text>
              <Text
                text={`€ ${toBeReturned[
                  person.id
                ].getAmount()} - ${alreadyReturned[person.id].getAmount()} `}
              />
            </View>
          ),
      )}
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
