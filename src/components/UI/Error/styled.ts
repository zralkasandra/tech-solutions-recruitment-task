import styled from "styled-components";
import styles from "const/styles";

const { colors } = styles;

export const Container = styled.div`
  border-radius: 15px;
  background-color: ${colors.errorLight};
  color: ${colors.errorDark};
  border: 1px solid ${colors.errorDark};
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  line-height: 1;
`;

export const Icon = styled.div`
  background-color: ${colors.errorDark};
  border-radius: 50%;
  width: 23px;
  height: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.white};
  margin-right: 10px;
`;

export const Text = styled.div`
  width: calc(100% - 30px);
`;
