import React, { Component } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
`;

export class Home extends Component {
  render() {
    return (
      <Container>
        <Navbar />
      </Container>
    );
  }
}

export default Home;
