import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import Login from "../components/pages/Login";
import { login, signin, goToMain } from "../modules/auth";

const LoginContainer = (props) => {
  const dispatch = useDispatch();
  const onLogin = useCallback((email, password) =>
    dispatch(login(email, password))
  );
  const onSignin = useCallback((email, password) =>
    dispatch(signin(email, password))
  );
  const onGoToMain = useCallback(() => {
    dispatch(goToMain());
  });
  return (
    <Login onLogin={onLogin} onSignin={onSignin} goToMain={onGoToMain}></Login>
  );
};

export default LoginContainer;
