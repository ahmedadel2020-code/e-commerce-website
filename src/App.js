import React, { Component } from "react";
import styled from "styled-components";
import Home from "./pages/Home";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Home />
      </Container>
    );
  }
}

export default App;
