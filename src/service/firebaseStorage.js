import { firebaseStorage } from "./firebaseConfig";

export const putStorage = async (ref, file) => {
  const storageRef = firebaseStorage.ref().child(`${ref}/${file.name}`);
  const response = await storageRef.put(file);
  return await response.ref.getDownloadURL();
};
