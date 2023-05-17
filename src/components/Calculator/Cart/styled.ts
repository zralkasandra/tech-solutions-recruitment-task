import styled from "styled-components";
import styles from "const/styles";

const { colors, breakpoints } = styles;

export const Container = styled.div`
  border: 1px solid ${colors.primary};
  border-radius: 15px;
  padding: 15px;

  @media (min-width: ${breakpoints.md}) {
    padding: 30px;
  }
`;

export const Header = styled.div`
  font-size: 22px;
  text-align: center;
  margin-bottom: 15px;

  @media (min-width: ${breakpoints.md}) {
    font-size: 25px;
    margin-bottom: 30px;
  }
`;

export const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  font-size: 20px;
  font-weight: bold;
`;
