import { firebase_db } from "./firebaseConfig";

export const setDB = async (ref, data) => {
  await firebase_db.ref(ref).set(data);
};

export const updateDB = async (ref, data) => {
  const updates = {};
  if (ref === "posts") {
    const newPostKey = firebase_db.ref().child(ref).push().key;
    data["postKey"] = newPostKey;
    updates[`/${ref}/` + newPostKey] = data;
  }
  await firebase_db.ref().update(updates);
};

export const removeDB = async (ref) => {
  await firebase_db.ref(ref).remove();
};

export const syncDB = async (ref, onUpdate) => {
  const dbRef = firebase_db.ref(ref);
  dbRef.on("value", (snapshot) => {
    const data = snapshot.val();
    data && onUpdate(data);
  });
  return () => dbRef.off();
};
