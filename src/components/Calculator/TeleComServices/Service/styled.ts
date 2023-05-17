import styled from "styled-components";
import styles from "const/styles";

const { colors, transition, breakpoints } = styles;

export const Container = styled.div<{ chosen: boolean }>`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.primary};
  border-radius: 15px;
  padding: 5px;
  margin-bottom: 10px;
  cursor: pointer;
  color: ${(props) => (props.chosen ? colors.white : colors.black)};
  background-color: ${(props) =>
    props.chosen ? colors.primary : colors.white};
  transition: ${transition("background-color")}, ${transition("color")};

  &.disabled {
    pointer-events: none;
    border: 1px solid ${colors.disabledDark};
    color: ${colors.disabledDark};
    background-color: ${colors.disabledLight};
  }

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.white};
  }

  @media (min-width: ${breakpoints.md}) {
    padding: 15px;
  }
`;

export const Icon = styled.img<{ disabled: boolean }>`
  height: 30px;
  width: 30px;
  margin-right: 10px;
  filter: ${(props) => (props.disabled ? "grayscale(100)" : "none")};

  @media (min-width: ${breakpoints.sm}) {
    height: 50px;
    width: 50px;
  }
`;

export const Text = styled.div`
  max-width: 150px;

  @media (min-width: ${breakpoints.sm}) {
    max-width: 250px;
  }
`;

export const Price = styled.div`
  margin-left: auto;
`;
