import styled from "styled-components";
import styles from "const/styles";

const { colors, breakpoints } = styles;

export const Title = styled.div`
  font-size: 18px;
  padding: 10px;

  @media (min-width: ${breakpoints.md}) {
    font-size: 20px;
    padding: 20px 10px;
  }
`;

export const Item = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${colors.primary};
  display: flex;
  align-items: center;
`;

export const Icon = styled.img`
  width: 30px;
  margin-right: 15px;
`;

export const Name = styled.div`
  line-height: 1;
`;

export const Price = styled.div`
  margin-left: auto;
`;
