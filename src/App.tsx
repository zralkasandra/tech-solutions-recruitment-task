import { useState } from "react";
import { Wrapper, Container, Content } from "./styled";
import Calculator from "components/Calculator";
import Tabs from "components/UI/Tabs";
import AdminPanel from "components/Admin";
import Footer from "components/Footer";
import { Mode } from "types/uiTypes";
import Header from "components/Header";

function App() {
  const [content, setContent] = useState<Mode>(Mode.user);

  const tabContent =
    content === Mode.user ? (
      <Calculator />
    ) : (
      <AdminPanel onSuccess={() => setContent(Mode.user)} />
    );

  return (
    <Wrapper>
      <Header />
      <Content>
        <Tabs active={content} onChangeTab={setContent} />
        <Container>{tabContent}</Container>
      </Content>
      <Footer />
    </Wrapper>
  );
}

export default App;
