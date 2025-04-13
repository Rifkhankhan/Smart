import { child, getDatabase, push, ref, update } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";

export const statusChange = async (status, orderKey) => {
  const app = getFirebaseApp();

  try {
    const dbRef = ref(getDatabase(app));
    const dataRef = child(dbRef, `orders/${orderKey}`);

    // need to check already is there are not

    await Promise.all([
      update(dataRef, {
        orderStatus: status,
        updatedAt: new Date().toISOString(),
      }),
    ]);
  } catch (error) {
    console.log(error);
    const errorCode = error.code;

    let message = "Something went wrong.";

    if (errorCode === "auth/email-already-in-use") {
      message = "This email is already in use";
    } else {
      message = errorCode;
    }

    throw new Error(message);
  }
};
