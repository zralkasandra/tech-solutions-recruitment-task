import React from "react";
import { Wrapper, Container, Logo } from "./styled";
import logo from "img/services/tv.png";

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Logo src={logo} alt="Logo" />
        TeleCorp
      </Container>
    </Wrapper>
  );
};

export default Header;
