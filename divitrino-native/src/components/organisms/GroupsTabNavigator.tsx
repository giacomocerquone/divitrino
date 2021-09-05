import React, { useState, FunctionComponent } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TabView, SceneRendererProps, Route } from "react-native-tab-view";

const GroupsTabNavigator: FunctionComponent<Props> = ({ renderScene }) => {
  const { width } = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width }}
    />
  );
};

export default GroupsTabNavigator;

const styles = StyleSheet.create({});

interface Props {
  renderScene: (
    props: SceneRendererProps & {
      route: Route;
    }
  ) => React.ReactNode;
}
