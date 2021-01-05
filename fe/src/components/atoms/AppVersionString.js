import React from "react";
import styled from "styled-components";

const AppVersionString = () => {
  return <Text>v.0.1.2</Text>;
};

export default AppVersionString;

const Text = styled.p`
  font-size: 10px;
  text-align: right;
`;
