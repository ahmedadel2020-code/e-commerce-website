import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import ProductDetails from "./pages/ProductDetails";
import Home from "./pages/Home";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/category/:category" component={Home} />
        </Switch>
      </Container>
    );
  }
}

export default App;
