import styled from "styled-components";
import styles from "const/styles";

const { colors, breakpoints } = styles;

export const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 0 15px;
`;

export const Tab = styled.div<{ active?: boolean }>`
  width: 50%;
  padding: 10px;
  border: 1px solid ${colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: none;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-color: ${(props) =>
    props.active ? colors.primary : colors.secondary};
  color: white;
  cursor: pointer;
  pointer-events: ${(props) => (props.active ? "none" : "auto")};

  &:hover {
    opacity: 0.8;
  }

  @media (min-width: ${breakpoints.sm}) {
    width: 200px;
    height: 50px;
  }
`;
