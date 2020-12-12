import React, {useCallback, useRef} from 'react';
import {StyleSheet, Animated, View} from 'react-native';
import Text from 'components/atoms/Text';
import Button from 'components/atoms/Button';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {getPeople} from 'store/app.reducer';
import peopleSlice from 'reducers/people';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {RectButton} from 'react-native-gesture-handler';

const People = () => {
  const {navigate} = useNavigation();
  const people = useSelector(getPeople);
  const dispatch = useDispatch();
  const swipeable = useRef(null);

  const renderRightActions = useCallback(
    (p, progress) => {
      const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [80, 0],
      });
      const pressHandler = () => {
        swipeable.current.close();
        dispatch(peopleSlice.actions.delPerson(p.id));
      };
      return (
        <Animated.View
          style={{
            width: 80,
            transform: [{translateX: trans}],
          }}>
          <RectButton style={styles.rightAction} onPress={pressHandler}>
            <Text
              uppercase
              weight="bold"
              color="#fff"
              text="elimina"
              size={16}
            />
          </RectButton>
        </Animated.View>
      );
    },
    [dispatch],
  );

  return (
    <>
      {people.map((p) => (
        <Swipeable
          key={p.id}
          ref={swipeable}
          renderRightActions={(progress) => renderRightActions(p, progress)}>
          <View style={styles.person}>
            <Text text={p.name} />
          </View>
        </Swipeable>
      ))}
      <Button
        label="aggiungi persona"
        onPress={() => navigate('AddPerson')}
        style={styles.addBtn}
      />
    </>
  );
};

export default People;

const styles = StyleSheet.create({
  rightAction: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C1004B',
  },
  person: {
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
  },
  addBtn: {
    marginTop: 20,
  },
});
