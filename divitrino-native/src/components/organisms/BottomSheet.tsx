import { Portal } from "@gorhom/portal";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  StyleSheet,
  Animated,
  Dimensions,
  View,
  PanResponder,
} from "react-native";

const PULL_DOWN_OFFSET = 80;

const BottomSheet = ({ open, onDismiss, children }: Props) => {
  const y = useRef(new Animated.Value(Dimensions.get("screen").height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const onInnerDismiss = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(y, {
        toValue: Dimensions.get("screen").height,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    onDismiss();
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          y.setValue(gesture.dy);
          backdropOpacity.setValue(0.6 - gesture.dy / 1000);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy <= PULL_DOWN_OFFSET) {
          Animated.parallel([
            Animated.timing(backdropOpacity, {
              toValue: 0.6,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(y, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ]).start();
        } else if (gesture.dy > PULL_DOWN_OFFSET) {
          onInnerDismiss();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (open) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0.6,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(y, {
          toValue: Dimensions.get("screen").height,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [backdropOpacity, open, y]);

  return (
    <Portal>
      <Animated.View
        pointerEvents={!open ? "none" : "auto"}
        onTouchStart={onInnerDismiss}
        style={[
          StyleSheet.absoluteFill,
          styles.container,
          { opacity: backdropOpacity },
        ]}
      />

      <Animated.View
        style={[
          styles.sheetContent,
          { opacity: 1, transform: [{ translateY: y }] },
        ]}
      >
        <>
          <View
            style={{
              width: "100%",
              height: 30,
              // TODO without background color the tap doesn't get correctly registered
              backgroundColor: "transparent",
              paddingVertical: 10,
            }}
            {...panResponder.panHandlers}
          >
            <View
              style={{
                height: 4,
                alignSelf: "center",
                backgroundColor: "#999",
                width: 24,
                marginBottom: 20,
              }}
            />
          </View>

          {children}
        </>
      </Animated.View>
    </Portal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000",
  },
  sheetContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#fff",
    height: "auto",
  },
});

interface Props {
  open: boolean;
  onDismiss: () => void;
  children?: ReactNode;
}
