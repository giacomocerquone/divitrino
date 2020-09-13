import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from 'components/atoms/Text';
import {useSelector} from 'react-redux';
import {getPersonById} from 'store/app.reducer';

const MovementRow = ({movement}) => {
  const isPurchase = movement.payee;
  const payer = useSelector((state) => getPersonById(state, movement.payer));
  const payee = useSelector((state) => getPersonById(state, movement.payee));
  return (
    <TouchableOpacity style={styles.container}>
      {isPurchase ? (
        <>
          <Text>
            <Text weight="bold" text={payer.name} /> ha pagato{' '}
            <Text weight="bold" text={payee.name} />
          </Text>
          <Text text={`€ ${movement.amount}`} weight="bold" size={22} />
        </>
      ) : (
        <>
          <View>
            <Text text={movement.description} />
            <Text text={`pagato da ${payer.name}`} weight="bold" size={14} />
          </View>

          <Text text={`€ ${movement.amount}`} size={22} weight="bold" />
        </>
      )}
    </TouchableOpacity>
  );
};

export default MovementRow;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    flexDirection: 'row',
  },
});
