import styled from "styled-components";
import styles from "const/styles";

const { breakpoints, colors, transition } = styles;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const Box = styled.div`
  width: calc(100% + 30px);
  border-bottom: 1px solid ${colors.primary};
  margin: -15px -15px 15px -15px;
  z-index: 1;

  @media (min-width: ${breakpoints.md}) {
    display: flex;
  }
`;

export const SubTab = styled.div<{ active: boolean }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid ${colors.primary};
  color: ${(props) => (props.active ? colors.primary : colors.black)};
  transition: ${transition("color")};
  pointer-events: ${(props) => (props.active ? "none" : "auto")};

  &:last-of-type {
    border-bottom: none;
  }

  &:hover {
    color: ${colors.secondary};
  }

  @media (min-width: ${breakpoints.md}) {
    width: 33.33%;
    border-right: 1px solid ${colors.primary};
    border-bottom: none;

    &:last-of-type {
      border-right: none;
    }
  }
`;
