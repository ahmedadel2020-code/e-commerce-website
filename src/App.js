import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

const Container = styled.div`
  overflow: ${(props) => (props.overlayState ? "hidden" : "auto")};
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      overlayState: false,
    };
  }
  onReceiveOverlayState = (overlayState) => {
    this.setState({ overlayState });
  };
  render() {
    return (
      <Container overlayState={this.state.overlayState}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Home onSendOverlayState={this.onReceiveOverlayState} />}
            />
            <Route path="category/:categoryName" element={<Home />} />
            <Route path="product/:productId" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
