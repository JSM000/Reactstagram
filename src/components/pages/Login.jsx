import React, { useCallback, useRef, useState } from "react";
import * as firebaseDB from "../../service/firebaseDB";
import * as firebaseAuth from "../../service/firebaseAuth";
import { useDispatch } from "react-redux";
import { login } from "../../modules/auth";

function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isCreateAccount, setIsCreateAccount] = useState(true);
  const dispatch = useDispatch();
  console.log(`isCreateAccount: ${isCreateAccount}`);

  // 디스패치 선언
  const onLogin = useCallback((email, password) =>
    dispatch(login(email, password))
  );

  //로그인, 회원가입 버튼 전환
  const toggleAccount = () => {
    setIsCreateAccount((prev) => !prev);
  };

  //회원가입 후, 프로필 생성하여 DB에 저장
  const CreateAccount = async (email, password) => {
    console.log("회원가입 실행됨");
    const result = await firebaseAuth.signin(email, password);
    const profile = {
      Introduce: "",
      Uid: result.user._delegate.uid,
      Username: result.user._delegate.email.match(/(.+)@/)[1],
      Userphoto: "",
    };
    await firebaseDB.updateDB(`users/${profile.Uid}/Profile`, profile);
  };

  const asd = (email, password) => {
    console.log("로그인 실행됨");
    onLogin(email, password);
  };

  //버튼 클릭 시, isCreateAccount에 따라 로그인 또는 회원가입
  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      isCreateAccount ? CreateAccount(email, password) : asd(email, password);
    } catch (e) {
      throw e;
    }
  };

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <input
            ref={emailRef}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            ref={passwordRef}
            name="password"
            type="password"
            placeholder="password"
            required
          />
          <input
            type="submit"
            value={isCreateAccount ? "Create Account" : "Login"}
          />
        </form>
        <span onClick={toggleAccount}>
          {isCreateAccount ? "Login" : "Craete Account"}
        </span>
      </div>
    </>
  );
}
export default Login;
