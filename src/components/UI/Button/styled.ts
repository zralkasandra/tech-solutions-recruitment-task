import styled from "styled-components";
import styles from "const/styles";

const { colors, formControls, transition } = styles;

export const Container = styled.button<{ disabled: boolean }>`
  width: ${formControls.width};
  height: ${formControls.height};
  background-color: ${(props) =>
    props.disabled ? colors.disabledLight : colors.primary};
  border-radius: ${formControls.borderRadius};
  transition: ${transition("background-color")};
  color: ${(props) => (props.disabled ? colors.disabledDark : colors.white)};
  font-family: "Josefin Sans", sans-serif;
  font-size: 18px;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.white};
  }
`;
