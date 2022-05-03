import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import * as firebaseAuth from "./service/firebaseAuth";
import { goToMain, goToLogin } from "./modules/auth";
import ReactLoading from "react-loading";
import LoginContainer from "./containers/LoginContainer";
import MainBlock from "./components/MainBlock";
import Header from "./components/Header";
import BottomTeb from "./components/Footer";
// import About from "./components/pages/About";
import Home from "./components/pages/Home";
// import Profiles from "./components/pages/Profiles";
import MyPage from "./components/pages/MyPage";
// import ProfileEdit from "./components/pages/ProfileEdit";
import Upload from "./components/pages/Upload";

const App = () => {
  const { loading, isLogin } = useSelector(({ auth }) => ({
    loading: auth.loading,
    isLogin: auth.isLogin,
  }));

  const dispatch = useDispatch();
  const onGoToMain = useCallback(() => {
    dispatch(goToMain());
  });
  const onGoToLogin = useCallback(() => {
    dispatch(goToLogin());
  });

  useEffect(() => {
    firebaseAuth.onAuthChanged((user) => {
      user ? onGoToMain() : onGoToLogin();
    });
  }, [firebaseAuth]);

  return loading ? (
    <ReactLoading type="spin" color="black" width="50%" height="50%" />
  ) : !isLogin ? (
    <LoginContainer></LoginContainer>
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

  // const [ready, setReady] = useState();
  // console.log(ready);

  // const handleLogout = () => {
  //   setReady(true);
  //   console.log(ready);
  // };

  // return ready ? (
  //   <TodoProvider>
  //     <Login setReady={setReady} ready={ready} />
  //   </TodoProvider>
  // ) : (
  //   <TodoProvider>
  //     <MainBlock>
  //       <Header></Header>
  //       <Routes>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/about" element={<About />} />
  //         <Route path="/Profiles/*" element={<Profiles />} />
  //         <Route path="/Upload" element={<Upload />} />
  //         <Route
  //           path="/MyPage"
  //           element={<MyPage handleLogout={handleLogout} />}
  //         />
  //         <Route path="/ProfileEdit" element={<ProfileEdit />} />
  //         <Route
  //           path="/*"
  //           element={<h1>이 페이지는 존재하지 않습니다. - </h1>}
  //         />
  //       </Routes>
  //       <BottomTeb></BottomTeb>
  //     </MainBlock>
  //   </TodoProvider>
  // );
};

export default React.memo(App);
