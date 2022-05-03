import React, { useRef, useState } from "react";
import * as firebaseDB from "../../service/firebaseDB";

function Login({ onLogin, onSignin }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isCreateAccount, setIsCreateAccount] = useState(true);

  const toggleAccount = () => {
    setIsCreateAccount((prev) => !prev);
  };

  const CreateAccount = (email, password) => {
    onSignin(email, password);
    const profile = {
      Profile: {
        Introduce: "",
        Uid: "",
        Username: "",
        Userphoto: "",
      },
    };
    //firebaseDB.updateDB(ref, data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      isCreateAccount
        ? CreateAccount(email, password)
        : onLogin(email, password);
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
