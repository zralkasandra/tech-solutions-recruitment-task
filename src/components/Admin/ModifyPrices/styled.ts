import styled from "styled-components";
import styles from "const/styles";

const { breakpoints, formControls } = styles;

export const Container = styled.div`
  padding: 5px;
  width: 100%;
  text-align: center;
  @media (min-width: ${breakpoints.md}) {
    text-align: left;
    padding: 30px;
  }
`;

export const Selector = styled.select`
  display: block;
  width: ${formControls.width};
  height: ${formControls.height};
  border-radius: ${formControls.borderRadius};
  padding: 15px;
  position: relative;
`;
