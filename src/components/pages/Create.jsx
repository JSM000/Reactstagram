import React, { useRef, useState } from "react";
import * as firebaseDB from "../../service/firebaseDB";
import * as firebaseAuth from "../../service/firebaseAuth";
import Welcome from "./Welcome";
import styled from "styled-components";
import Loading from "./Loading";
import Fileinput from "../innerComponents/FIleinput";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;
const FileInputButton = styled.button`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  background: none;
  border: none;
  font-weight: bolder;
  color: #0095f6;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  width: 350px;
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: #eaeaeaea;
  border: 1px solid #a1a1a1a1;
`;
const SubmitBtn = styled.button`
  width: 350px;
  padding: 10px 0px;
  color: white;
  font-weight: bold;
  background-color: #0095f6;
  margin: 5px;
  border: none;
  border-radius: 10px;
`;
const BackBtn = styled.button`
  background-color: white;
  width: 350px;
  padding: 10px 0px;
  font-weight: bold;
  margin: 5px;
  border: none;
  border-radius: 10px;
  color: #0095f6;
`;

function Create(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [backBtn, setBackBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  //회원가입 후, 프로필 생성하여 DB에 저장
  const CreateAccount = async (email, password) => {
    console.log("회원가입 실행됨");
    const result = await firebaseAuth.signin(email, password);
    const profile = {
      Introduce: "",
      Uid: result.user._delegate.uid,
      UserName: result.user._delegate.email.match(/(.+)@/)[1],
      UserImgURL: "",
    };
    await firebaseDB.updateDB(`users/${profile.Uid}/Profile`, profile);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      await CreateAccount(email, password);
    } catch (e) {
      setLoading(false);
      throw e;
    }
    setLoading(false);
  };

  const saveFile = (file) => {
    setFile(file);
  };

  return loading ? (
    <Loading />
  ) : backBtn ? (
    <Welcome></Welcome>
  ) : (
    <Container>
      <Fileinput saveFile={(file) => setFile(file)} />
      <Form onSubmit={onSubmit}>
        <Input ref={emailRef} type="email" placeholder="이메일 주소" required />
        <Input
          ref={passwordRef}
          type="password"
          placeholder="비밀번호"
          required
        />
        <SubmitBtn type="submit">새 계정 만들기</SubmitBtn>
      </Form>
      <BackBtn onClick={() => setBackBtn(true)}>{"<<뒤로가기"}</BackBtn>
    </Container>
  );
}
export default Create;
