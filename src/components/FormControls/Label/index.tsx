import React from "react";
import { Element } from "./styled";

const Label: React.FC<{ name: string }> = ({ name }) => {
  return <Element>{name}</Element>;
};

export default Label;
