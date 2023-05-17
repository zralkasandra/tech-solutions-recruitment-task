import React from "react";
import { Container, Tab } from "./styled";
import { Mode } from "types/uiTypes";

const Tabs: React.FC<{
  active: Mode;
  onChangeTab: (mode: Mode) => void;
}> = ({ active, onChangeTab }) => {
  return (
    <Container>
      <Tab
        active={active === Mode.user}
        onClick={() => {
          onChangeTab(Mode.user);
        }}
      >
        Kalkulator usług
      </Tab>
      <Tab
        active={active === Mode.admin}
        onClick={() => {
          onChangeTab(Mode.admin);
        }}
      >
        Panel administratora
      </Tab>
    </Container>
  );
};

export default Tabs;
