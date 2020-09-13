import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from 'components/atoms/Text';

const MovementRow = ({movement}) => {
  const isPurchase = movement.payee;
  return (
    <TouchableOpacity style={styles.container}>
      {isPurchase ? (
        <>
          <Text>
            <Text weight="bold" text={movement.payer} /> ha pagato{' '}
            <Text weight="bold" text={movement.payee} />
          </Text>
          <Text text={`€ ${movement.amount}`} weight="bold" size={22} />
        </>
      ) : (
        <>
          <View>
            <Text text={movement.description} />
            <Text
              text={`pagato da ${movement.payer}`}
              weight="bold"
              size={14}
            />
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
