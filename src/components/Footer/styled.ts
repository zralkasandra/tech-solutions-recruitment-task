import styled from "styled-components";
import styles from "const/styles";

const { colors, transition, breakpoints, containers } = styles;

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px;
  background-color: ${colors.primary};
`;

export const Container = styled.div`
  a,
  a:visited,
  a:active {
    color: ${colors.white};
    transition: ${transition("color")};
  }
  a:hover {
    color: ${colors.secondary};
  }

  @media (min-width: ${breakpoints.md}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: ${containers.xl};
    margin: auto;
  }
`;

export const Icons = styled.div`
  color: ${colors.white};

  a {
    display: block;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const Task = styled.div`
  color: ${colors.white};
  margin-bottom: 25px;

  @media (min-width: ${breakpoints.md}) {
    margin-bottom: 0;
  }
`;
