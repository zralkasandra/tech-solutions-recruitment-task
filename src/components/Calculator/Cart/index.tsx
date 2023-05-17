import { useSelector } from "react-redux";
import { Container, Header, Summary } from "./styled";
import {
  selectChosenTeleComServices,
  selectTeleComPackages,
  selectTeleComServices,
} from "features/teleComServicesSlice";
import Section from "./Section";
import { getCart } from "helpers/cart";
import { selectActiveYear } from "features/yearsSlice";

const Cart: React.FC = () => {
  const allServices = useSelector(selectTeleComServices);
  const allPackages = useSelector(selectTeleComPackages);
  const selectedServices = useSelector(selectChosenTeleComServices);
  const year = useSelector(selectActiveYear);
  const cart = getCart(allPackages, selectedServices, year, allServices);

  if (cart.price === 0) {
    return (
      <Container>
        <Header>Twój koszyk:</Header> Twój koszyk jest pusty
      </Container>
    );
  }

  return (
    <Container>
      <Header>Twój koszyk:</Header>
      <>
        {cart.packages.length > 0 && (
          <Section
            title="Pakiety"
            items={cart.packages}
            itemsData={allPackages}
          />
        )}
        {cart.services.length > 0 && (
          <Section
            title="Usługi"
            items={cart.services}
            itemsData={allServices}
          />
        )}
        {cart.free.length > 0 && (
          <Section
            title="Gratisy"
            items={cart.free}
            itemsData={allServices}
            isFree={true}
          />
        )}
        <Summary>
          <span>Razem:</span> <span>{cart.price} zł</span>
        </Summary>
      </>
    </Container>
  );
};

export default Cart;
