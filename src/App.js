import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import * as firebaseAuth from "./service/firebaseAuth";
import { goToMain, goToLogin } from "./modules/auth";
import { syncProfile } from "./modules/profileDB";
import ReactLoading from "react-loading";
import Login from "./components/pages/Login";
import MainBlock from "./components/MainBlock";
import Header from "./components/Header";
import BottomTeb from "./components/Footer";
import Home from "./components/pages/Home";
import MyPage from "./components/pages/MyPage";
import Upload from "./components/pages/Upload";
// import About from "./components/pages/About";
// import Profiles from "./components/pages/Profiles";
// import ProfileEdit from "./components/pages/ProfileEdit";

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
    firebaseAuth.onAuthChanged(async (user) => {
      user && (await onSyncProfile(user.uid));
      user ? onGoToMain() : onGoToLogin();
    });
  }, [firebaseAuth]);

  console.log();

  return loading ? (
    <ReactLoading type="spin" color="black" width="50%" height="50%" />
  ) : !isLogin ? (
    <Login></Login>
  ) : (
    <MainBlock>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} />
        <Route path="/Profiles/*" element={<Profiles />} /> */}
        <Route path="/Upload" element={<Upload />} />
        <Route path="/MyPage" element={<MyPage />} />
        {/* <Route path="/ProfileEdit" element={<ProfileEdit />} />
        <Route
          path="/*"
          element={<h1>이 페이지는 존재하지 않습니다. - </h1>}
        /> */}
      </Routes>
      <BottomTeb></BottomTeb>
    </MainBlock>
  );
};

export default React.memo(App);
