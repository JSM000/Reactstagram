import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import * as firebaseAuth from "./service/firebaseAuth";
import { goToMain, goToLogin, logout } from "./modules/auth";
import { syncProfile } from "./modules/profileDB";
import Loading from "./components/pages/Loading";
import MainBlock from "./components/MainBlock";
import Header from "./components/Header";
import BottomTeb from "./components/Footer";
import Home from "./components/pages/Home";
import MyPage from "./components/pages/MyPage";
import Upload from "./components/pages/Upload";
import ProfileEdit from "./components/pages/ProfileEdit";
import Welcome from "./components/pages/Welcome";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();

  //전역변수 loading, isLogin관리
  const { loading, isLogin } = useSelector(({ auth }) => ({
    loading: auth.loading,
    isLogin: auth.isLogin,
  }));
  const onGoToMain = useCallback(() => {
    dispatch(goToMain());
  });
  const onGoToLogin = useCallback(() => {
    dispatch(goToLogin());
  });

  //전역 값 Profile 관리
  const onSyncProfile = useCallback((uid) => {
    dispatch(syncProfile(uid));
  });

  //웹 접속시
  // 1. 로그인 여부 파악하여 로그인, 메인 페이지 전환
  // 2. DB에서 해당 UID의 Profile 받아와서 전역 state에 저장
  useEffect(() => {
    const setInit = () => {
      firebaseAuth.onAuthChanged(async (user) => {
        user && (await onSyncProfile(user.uid));
        user ? onGoToMain() : onGoToLogin();
      });
    };
    setInit();
  }, [firebaseAuth]);

  return loading ? (
    <Loading />
  ) : !isLogin ? (
    <Welcome></Welcome>
  ) : (
    <MainBlock>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Upload" element={<Upload />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/ProfileEdit" element={<ProfileEdit />} />
        <Route path="/*" element={<h1>이 페이지는 존재하지 않습니다. - </h1>} />
      </Routes>
      <BottomTeb></BottomTeb>
    </MainBlock>
  );
};

export default React.memo(App);
