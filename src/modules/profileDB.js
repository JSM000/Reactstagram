import { handleActions } from "redux-actions";
import * as firebaseDB from "../service/firebaseDB";

const SYNC_PROFILE = "auth/SYNCPROFILE";

export const syncProfile = (uid) => async (dispatch) => {
  try {
    const syncOff = firebaseDB.syncDB(`/users/${uid}/Profile`, (data) => {
      dispatch({ type: SYNC_PROFILE, payload: data });
    });
    return syncOff;
  } catch (e) {
    throw e;
  }
};

const initialState = {};

const profileDB = handleActions(
  {
    [SYNC_PROFILE]: (state, action) => ({
      Profile: action.payload,
    }),
  },
  initialState
);

export default profileDB;
