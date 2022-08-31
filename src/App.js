import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { connect } from "react-redux";
import CartPage from "./pages/CartPage";

const Container = styled.div`
  overflow: ${(props) => (props.overlayState ? "hidden" : "auto")};
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  render() {
    const { cartOverlayState } = this.props;
    return (
      <Container overlayState={cartOverlayState}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="category/:categoryName" element={<Home />} />
          <Route
            path="product/:productId/:categoryName"
            element={<ProductPage />}
          />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </Container>
    );
  }
}

function mapStateToProps({ cart }) {
  return {
    cartOverlayState: cart.cartOverlayState,
  };
}

export default connect(mapStateToProps)(App);
