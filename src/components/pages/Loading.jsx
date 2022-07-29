import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-family: asd;
  font-size: 3rem;
  font-weight: bold;
`;
const Loading = (props) => {
  return (
    <Container>
      <ReactLoading type="spin" color="black" width="100px" height="100px" />
      잠시만 기다려 주세요.
    </Container>
  );
};

export default Loading;
