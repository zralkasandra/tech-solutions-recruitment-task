import styled from "styled-components";
import styles from "const/styles";

const { breakpoints, containers } = styles;

export const Container = styled.div`
  margin: auto;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    max-width: ${containers.xl};
    flex-wrap: wrap;
  }
`;

export const Column = styled.div`
  padding: 5px;
  @media (min-width: ${breakpoints.md}) {
    width: 50%;
    padding: 15px;
  }
`;
