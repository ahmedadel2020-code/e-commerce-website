import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:productId" element={<ProductPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;
