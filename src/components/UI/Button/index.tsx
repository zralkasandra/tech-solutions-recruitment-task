import React from "react";
import { Container } from "./styled";
import { ButtonType } from "types/uiTypes";

const Button: React.FC<{
  onClick: () => void;
  label: string;
  disabled?: boolean;
  type?: ButtonType;
}> = ({ onClick, label, disabled = false, type = "button" }) => {
  return (
    <Container type={type} onClick={onClick} disabled={disabled}>
      {label}
    </Container>
  );
};

export default Button;
