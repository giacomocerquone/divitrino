import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {getMovements} from 'store/app.reducer';
import MovementRow from 'components/organism/MovementRow';

const Home = () => {
  const {navigate} = useNavigation();
  const movements = useSelector(getMovements);
  return (
    <ScrollView>
      <Text size={50} style={styles.title}>
        Movimenti
      </Text>
      <View style={styles.row}>
        <Button
          ghost
          onPress={() => navigate('AddPurchase')}
          label=" acquisti"
          style={[styles.addBtn, styles.leftBtn]}
          Icon={
            <MaterialCommunityIcons
              name="text-box-plus-outline"
              color="#1132D6"
              size={26}
            />
          }
        />
        <Button
          ghost
          onPress={() => navigate('AddPayment')}
          label=" pagamento"
          style={[styles.addBtn, styles.rightBtn]}
          Icon={
            <MaterialCommunityIcons
              name="beaker-plus-outline"
              color="#1132D6"
              size={26}
            />
          }
        />
      </View>
      {movements.map((m) => (
        <MovementRow key={m.id} movement={m} />
      ))}
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  addBtn: {flex: 1, paddingVertical: 10, marginHorizontal: 5},
  leftBtn: {marginRight: 5},
  rightBtn: {marginLeft: 5},
  title: {marginTop: 30, marginBottom: 10},
  row: {
    flexDirection: 'row',
    marginVertical: 20,
  },
});
