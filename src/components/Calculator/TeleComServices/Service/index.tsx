import { Container, Icon, Text, Price } from "./styled";

const Service: React.FC<{
  id: string;
  icon: string;
  name: string;
  chosen: boolean;
  price: number;
  onChooseService: (id: string) => void;
}> = ({ id, icon, name, chosen, price, onChooseService }) => {
  const disabled = price === -1;
  const priceLabel =
    price === -1 ? "Usługa niedostępna w wybranym roku" : `${price} zł`;
  return (
    <Container
      onClick={() => onChooseService(id)}
      chosen={chosen}
      className={disabled ? "disabled" : ""}
    >
      <Icon src={icon} disabled={disabled} />
      <Text>{name}</Text>
      <Price>{priceLabel}</Price>
    </Container>
  );
};

export default Service;
