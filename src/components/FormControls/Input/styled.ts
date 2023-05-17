import styled from "styled-components";
import styles from "const/styles";

const { formControls } = styles;

export const Element = styled.input`
  width: ${formControls.width};
  height: ${formControls.height};
  border-radius: ${formControls.borderRadius};
  display: block;
  margin-bottom: 20px;
  padding: 15px;
`;
