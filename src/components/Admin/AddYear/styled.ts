import styled from "styled-components";
import styles from "const/styles";

const { breakpoints } = styles;

export const Container = styled.div`
  width: 100%;
  text-align: center;

  @media (min-width: ${breakpoints.md}) {
    text-align: left;
    padding: 30px;
  }
`;
