import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import PayeeReport from 'components/organism/PayeeReport';
import {useSelector} from 'react-redux';
import {getPeople} from 'store/app.reducer';

const People = () => {
  const {navigate} = useNavigation();
  const people = useSelector(getPeople);

  console.log(people);

  return (
    <ScrollView>
      <Text size={50} style={styles.title}>
        Bilancio
      </Text>
      <Text text="+ deve ricevere" />
      <Text text="- deve dare" />
      {people.map((p) => (
        <PayeeReport key={p.id} person={p} />
      ))}
      <Button
        label="pareggia conti"
        onPress={() => null}
        style={styles.settleAmounts}
      />
      <Button
        label="gestisci gruppo"
        onPress={() => navigate('People')}
        style={styles.handleBtn}
      />
    </ScrollView>
  );
};

export default People;

const styles = StyleSheet.create({
  title: {
    marginVertical: 30,
  },
  handleBtn: {
    marginTop: 10,
  },
  settleAmounts: {
    marginTop: 20,
    backgroundColor: '#00C978',
  },
});
