import styled from "styled-components";
import styles from "const/styles";

const { colors, containers, breakpoints } = styles;

export const Wrapper = styled.div`
  font-family: "Josefin Sans", sans-serif;
`;

export const Content = styled.div`
  margin: auto;
  max-width: ${containers.xl};
`;

export const Container = styled.div`
  border: 1px solid ${colors.primary};
  border-radius: 15px;
  padding: 15px 5px;
  margin: 0 5px 30px 5px;

  @media (min-width: ${breakpoints.sm}) {
    padding: 15px;
  }
`;

export const Field = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;

  @media (min-width: ${breakpoints.md}) {
    margin: initial;
    width: 50%;
    align-items: flex-start;
  }
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid ${colors.primary};
  padding: 10px 0;

  button {
    margin-bottom: 10px;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;

export const GroupTitle = styled.h2`
  width: 100%;
`;
