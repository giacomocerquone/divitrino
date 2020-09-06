import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Box from 'components/atoms/Box';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import {useNavigation} from '@react-navigation/native';

const People = () => {
  const {navigate} = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <Text size={50} style={styles.title}>
        Bilancio
      </Text>
      <Box>
        <View style={styles.row}>
          <Text>
            <Text weight="bold" text="Giacomo" />
            <Text text=" riceve" />
          </Text>
          <Text text="€ 40" />
        </View>
      </Box>
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
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 30},
  title: {
    marginBottom: 10,
    marginTop: 10,
  },
  groupsTitle: {marginTop: 30},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  groupItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingVertical: 15,
  },
  handleBtn: {
    marginTop: 20,
  },
});
