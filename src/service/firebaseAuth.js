import { authService } from "./firebaseConfig";

export const login = async (email, password) => {
  return await authService.signInWithEmailAndPassword(email, password);
};

export const logout = async () => {
  return await authService.signOut();
};

export const signin = async (email, password) => {
  return await authService.createUserWithEmailAndPassword(email, password);
};

export const currentUser = () => {
  return authService.currentUser;
};

export const onAuthChanged = (onUserChanged) => {
  authService.onAuthStateChanged((user) => {
    onUserChanged(user);
  });
};
