import React, { useState } from "react";
import { Container, Box, SubTab } from "./styled";
import { Form } from "types/uiTypes";
import AddService from "./AddService";
import AddYear from "./AddYear";
import ModifyPrices from "./ModifyPrices";

const AdminPanel: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [currentForm, setCurrentForm] = useState<Form>(Form.service);

  let form = <AddService onSuccess={onSuccess} />;
  switch (currentForm) {
    case Form.service:
      form = <AddService onSuccess={onSuccess} />;
      break;
    case Form.year:
      form = <AddYear onSuccess={onSuccess} />;
      break;
    case Form.modification:
      form = <ModifyPrices onSuccess={onSuccess} />;
      break;
  }

  return (
    <Container>
      <Box>
        <SubTab
          active={currentForm === Form.service}
          onClick={() => setCurrentForm(Form.service)}
        >
          Dodaj usługę
        </SubTab>
        <SubTab
          active={currentForm === Form.year}
          onClick={() => setCurrentForm(Form.year)}
        >
          Dodaj rok
        </SubTab>
        <SubTab
          active={currentForm === Form.modification}
          onClick={() => setCurrentForm(Form.modification)}
        >
          Modyfikuj ceny
        </SubTab>
      </Box>
      {form}
    </Container>
  );
};

export default AdminPanel;
