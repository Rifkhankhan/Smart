import {
  child,
  endAt,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  startAt,
} from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";

export const searchItems = async (queryText, type) => {
  const searchTerm = queryText.toLowerCase();

  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const termRef = child(dbRef, type);
    const queryRef = query(
      termRef,
      orderByChild("name"),
      startAt(searchTerm),
      endAt(searchTerm + "\uf8ff")
    );
    const snapshot = await get(queryRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const searchItems = async (queryText, type) => {
//   const searchTerm = queryText.toLowerCase();

//   try {
//     const app = getFirebaseApp();
//     const db = getDatabase(app);
//     const termRef = ref(db, type);

//     // Create queries for Realtime Database
//     const nameQuery = query(
//       termRef,
//       orderByChild("name"),
//       startAt(searchTerm),
//       endAt(searchTerm + "\uf8ff")
//     );

//     const brandQuery = query(
//       termRef,
//       orderByChild("brand"),
//       startAt(searchTerm),
//       endAt(searchTerm + "\uf8ff")
//     );

//     // Execute queries
//     const [nameSnapshot, brandSnapshot] = await Promise.all([
//       get(nameQuery),
//       get(brandQuery),
//     ]);

//     const nameResults = nameSnapshot.exists() ? nameSnapshot.val() : {};
//     const brandResults = brandSnapshot.exists() ? brandSnapshot.val() : {};

//     // Combine results and deduplicate
//     const combinedResults = { ...nameResults, ...brandResults };

//     return combinedResults;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };
