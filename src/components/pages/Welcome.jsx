import React, { useState } from "react";
import styled from "styled-components";
import Create from "./Create";
import Login from "./Login";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;
const Title = styled.span`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 20px;
  font-family: asd;
`;
const CreateBtn = styled.button`
  width: 350px;
  padding: 10px 0px;
  color: white;
  font-weight: bold;
  background-color: #0095f6;
  margin: 5px;
  border: none;
  border-radius: 10px;
`;
const LoginBtn = styled.button`
  background-color: white;
  width: 350px;
  padding: 10px 0px;
  font-weight: bold;
  margin: 5px;
  border: none;
  border-radius: 10px;
  color: #0095f6;
`;

const Welcome = (props) => {
  const [stage, setStage] = useState("Welcome");
  return (
    <>
      {stage === "Welcome" && (
        <Container>
          <Title>Instagram</Title>
          <CreateBtn onClick={() => setStage("Create")}>
            새 계정 만들기
          </CreateBtn>
          <LoginBtn onClick={() => setStage("Login")}>로그인</LoginBtn>
        </Container>
      )}
      {stage === "Login" && <Login></Login>}
      {stage === "Create" && <Create></Create>}
    </>
  );
};

export default Welcome;
