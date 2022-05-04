import { createAction } from "redux-actions";
import { handleActions } from "redux-actions";
import * as firebaseAuth from "../service/firebaseAuth";

const LOGIN_SUCCESS = "auth/LOGIN_SUCCESS";
const LOGOUT_SUCCESS = "auth/LOGOUT_SUCCESS";
const GOTOMAIN = "auth/GOTOMAIN";
const GOTOLOGIN = "auth/GOTOLOGIN";

export const login = (email, password) => async (dispatch) => {
  try {
    await firebaseAuth.login(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
    });
  } catch (e) {
    throw e;
  }
};

export const logout = () => async (dispatch) => {
  try {
    await firebaseAuth.logout();
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    throw e;
  }
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
