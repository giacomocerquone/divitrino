import React from "react";
import styled from "styled-components";

const AppVersionString = () => {
  return <Text>v.0.1.0</Text>;
};

export default AppVersionString;

const Text = styled.p`
  font-size: 10px;
  position: fixed;
  right: 5px;
  bottom: 5px;
`;
