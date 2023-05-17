import React from "react";
import { Wrapper, Container, Icons, Task } from "./styled";

const Footer = () => {
  return (
    <Wrapper>
      <Container>
        <Task>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://www.sptech.pl/_files/ugd/764a63_50328068d6fd4a6e9f581c79eb90b7e9.pdf"
          >
            Zadanie rekrutacyjne
          </a>
          &nbsp;dla firmy Tech Solutions by Sandra Żrałka
        </Task>
        <Icons>
          <a target="_blank" rel="noreferrer" href="https://icons8.com">
            All icons by Icons8
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://icons8.com/icons/authors/yBYuQGoVb782/kerismaker/external-goofy-color-kerismaker/external-home-appliance-goofy-color-kerismaker"
          >
            Home Appliance Icons
          </a>
        </Icons>
      </Container>
    </Wrapper>
  );
};

export default Footer;
