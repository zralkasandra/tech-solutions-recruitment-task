import React from "react";
import { Container, Icon, Text } from "./styled";

const Error: React.FC<{ error: string }> = ({ error }) => {
  return (
    <Container>
      <Icon>!</Icon>
      <Text>{error}</Text>
    </Container>
  );
};

export default Error;
