import { firebaseStorage } from "./firebaseConfig";

export const putStorage = async (file) => {
  const storageRef = firebaseStorage.ref().child(`images/${file.name}`);
  const response = await storageRef.put(file);
  return await response.ref.getDownloadURL();
};
