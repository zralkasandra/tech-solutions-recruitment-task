import styled from "styled-components";
import styles from "const/styles";

const { colors, breakpoints, containers } = styles;

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
  background-color: ${colors.primary};
  align-items: center;
  margin-bottom: 30px;
`;

export const Container = styled.div`
  max-width: ${containers.xl};
  margin: auto;
  color: ${colors.white};
  font-size: 30px;
  display: flex;
  align-items: center;

  @media (min-width: ${breakpoints.sm}) {
    font-size: 50px;
  }
`;

export const Logo = styled.img`
  height: 50px;
  margin-right: 15px;

  @media (min-width: ${breakpoints.sm}) {
    height: 75px;
  }
`;
