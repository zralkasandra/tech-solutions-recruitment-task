import { Container, Column } from "./styled";
import Years from "./Years";
import TeleComServices from "./TeleComServices";
import Cart from "./Cart";

const Calculator = () => {
  return (
    <Container>
      <Column>
        <Years />
        <TeleComServices />
      </Column>
      <Column>
        <Cart />
      </Column>
    </Container>
  );
};

export default Calculator;
