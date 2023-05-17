import styled from "styled-components";
import styles from "const/styles";

const { colors, breakpoints, transition } = styles;

export const Container = styled.div`
  margin-bottom: 15px;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
  }
`;

export const Label = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding: 10px 0;
  text-align: center;

  @media (min-width: ${breakpoints.md}) {
    font-size: 25px;
    width: 30%;
    text-align: left;
    margin-right: 15px;
  }
`;

export const Year = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.primary};
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
  margin-right: 15px;
  color: ${(props) => (props.selected ? colors.white : colors.black)};
  background-color: ${(props) =>
    props.selected ? colors.primary : colors.white};
  transition: ${transition("background-color")}, ${transition("color")};
  margin-bottom: 10px;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.white};
  }
`;

export const YearsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: ${breakpoints.md}) {
    width: 70%;
    justify-content: flex-start;
  }
`;
