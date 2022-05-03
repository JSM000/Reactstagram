import { createAction } from "redux-actions";
import { handleActions } from "redux-actions";
import { authService } from "../service/firebaseConfig";

const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";

const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";

const SIGNIN_SUCCESS = "auth/SIGNIN_SUCCESS";

const GOTOMAIN = "auth/GOTOMAIN";
const GOTOLOGIN = "auth/GOTOLOGIN";

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await authService.signInWithEmailAndPassword(
      email,
      password
    );
    console.log(response);
    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (e) {
    throw e;
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await authService.signOut();
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    throw e;
  }
};

export const signin = (email, password) => async (dispatch) => {
  try {
    const response = await authService.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log(response);
    dispatch({
      type: SIGNIN_SUCCESS,
    });
  } catch (e) {
    throw e;
  }
};

export const currentUser = () => {
  return authService.currentUser;
};

export const onAuthChanged = (onUserChanged) => {
  authService.onAuthStateChanged((user) => {
    onUserChanged(user);
  });
};

export const goToMain = createAction(GOTOMAIN);
export const goToLogin = createAction(GOTOLOGIN);

const initialState = {
  loading: true,
  isLogin: null,
};

const auth = handleActions(
  {
    [LOGIN_SUCCESS]: (state) => ({
      isLogin: true,
    }),
    [LOGOUT_SUCCESS]: (state) => ({
      isLogin: false,
    }),
    [SIGNIN_SUCCESS]: (state) => ({
      state,
    }),
    [GOTOMAIN]: (state) => ({
      loading: false,
      isLogin: true,
    }),
    [GOTOLOGIN]: (state) => ({
      loading: false,
      isLogin: false,
    }),
  },
  initialState
);

export default auth;
