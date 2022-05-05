import { async } from "@firebase/util";
import { handleActions } from "redux-actions";
import * as firebaseDB from "../service/firebaseDB";

const UPDATE_PROFILE = "profileDB/UPDATEPOFILE";

export const syncProfile = (uid) => async (dispatch) => {
  try {
    const syncOff = firebaseDB.syncDB(`/users/${uid}/Profile`, (data) => {
      dispatch({ type: UPDATE_PROFILE, payload: data });
    });
    return syncOff;
  } catch (e) {
    throw e;
  }
};

export const updateProfile = (ref, data) => async (dispatch) => {
  try {
    await firebaseDB.updateDB(ref, data);
    dispatch({ type: UPDATE_PROFILE, payload: data });
  } catch (e) {
    throw e;
  }
};

const initialState = {};

const profileDB = handleActions(
  {
    [UPDATE_PROFILE]: (state, action) => ({
      Profile: action.payload,
    }),
  },
  initialState
);

export default profileDB;
