import styled from "styled-components";
import styles from "const/styles";

const { colors, breakpoints } = styles;

export const Container = styled.div`
  padding: 5px;
  width: 100%;
  text-align: center;
  @media (min-width: ${breakpoints.md}) {
    text-align: left;
    padding: 30px;
  }
`;

export const Choices = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: left;
`;

export const ChoiceLabel = styled.label<{ selected: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  position: relative;

  &:before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: 2px solid ${colors.primary};
    margin-right: 10px;
    background-color: ${(props) =>
      props.selected ? colors.primary : "transparent"};
  }

  &:after {
    content: "✔";
    display: ${(props) => (props.selected ? "block" : "none")};
    color: ${colors.white};
    position: absolute;
    left: 5px;
    top: 3px;
  }

  @media (min-width: ${breakpoints.md}) {
    width: 50%;
  }
`;

export const Choice = styled.input`
  display: none;
`;

export const Icon = styled.img`
  width: 30px;
  margin-right: 10px;
`;

export const Icons = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;

export const Image = styled.img<{ selected: boolean }>`
  width: 30px;
  height: 30px;
  margin: 5px;
  cursor: pointer;
  border: 1px solid
    ${(props) => (props.selected ? colors.primary : "transparent")};
  padding: 5px;
`;
