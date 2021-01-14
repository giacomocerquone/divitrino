import React from "react";
import styled from "styled-components";

const AppVersionString = () => {
  return <Text>v.{process.env.REACT_APP_VERSION}</Text>;
};

export default AppVersionString;

const Text = styled.p`
  font-size: 10px;
  text-align: right;
`;
