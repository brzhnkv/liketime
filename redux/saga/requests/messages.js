import { db } from "../../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const requestGetMessages = async (username) => {
  const docRef = doc(db, "messages", username);
  const docSnap = await getDoc(docRef);

  /* if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  } */

  const data = docSnap.data();
  console.log(data);
  return data;
};
