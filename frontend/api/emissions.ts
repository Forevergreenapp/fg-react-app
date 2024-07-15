import { getFirestore, doc, getDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";

type EmissionsType = "energy" | "transportation" | "diet" | "total";

export const fetchEmissionsData = async ({
  type,
  month,
}: {
  type: EmissionsType;
  month?: string;
}) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    console.error("No user logged in");
    return null;
  }

  const userId = auth.currentUser.uid;

  // If the user gives a month, try to fetch that month
  // Otherwise use current month
  let formattedMonth;
  if (!month) {
    formattedMonth = dayjs().format("YYYY-MM");
  } else {
    formattedMonth = month;
  }

  const DocRef = doc(
    collection(db, "users", userId, "surveys"),
    formattedMonth
  );

  try {
    const Doc = await getDoc(DocRef);

    if (Doc.exists()) {
      const data = Doc.data();
      switch (type) {
        case "energy":
          return data.energyData;
        case "transportation":
          return data.transportationData;
        case "diet":
          return data.dietData;
        case "total":
          return data.totalData;
        default:
          return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching transportation data:", error);
    return null;
  }
};
