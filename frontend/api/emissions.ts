import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";

export const fetchEmissionsData = async (type: string) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    console.error("No user logged in");
    return null;
  }

  const userId = auth.currentUser.uid;
  const currentMonth = dayjs().format("YYYY-MM");
  const DocRef = doc(collection(db, "users", userId, "surveys"), currentMonth);

  try {
    const Doc = await getDoc(DocRef);

    if (Doc.exists()) {
      switch (type) {
        case "energy":
          return Doc.data().energyData;
        case "transportation":
          return Doc.data().transportationData;
        case "diet":
          return Doc.data().dietData;
        case "total":
          return Doc.data().totalData;
        default:
          return null;
      }
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching transportation data:", error);
    return null;
  }
};
