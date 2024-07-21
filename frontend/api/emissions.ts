import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import dayjs from "dayjs";

interface EmissionsData {
  energyData?: any;
  transportationData?: any;
  dietData?: any;
  totalData: {
    transportationEmissions: number;
    dietEmissions: number;
    energyEmissions: number;
    totalEmissions: number;
  };
}

// Todo: Especially port this to Cloud Functions
export const saveEmissionsData = async (data: EmissionsData) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    console.error("No user logged in");
    throw new Error("No user logged in");
  }

  const userId = auth.currentUser.uid;
  const formattedMonth = dayjs().format("YYYY-MM");
  const userDocRef = doc(
    collection(db, "users", userId, "surveys"),
    formattedMonth
  );

  try {
    await setDoc(
      userDocRef,
      {
        ...data,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("Emissions data saved successfully");
  } catch (error) {
    console.error("Error saving emissions data:", error);
    throw error;
  }
};

// Todo: Eventually port this to Cloud Functions
// Todo: Also implement caching and async storage to reduce API calls
export const fetchEmissionsData = async (month?: string) => {
  const auth = getAuth();
  const db = getFirestore();

  if (!auth.currentUser) {
    console.error("No user logged in");
    return null;
  }

  const userId = auth.currentUser.uid;

  let formattedMonth = month || dayjs().format("YYYY-MM");

  const DocRef = doc(
    collection(db, "users", userId, "surveys"),
    formattedMonth
  );

  try {
    const Doc = await getDoc(DocRef);
    return Doc.exists() ? Doc.data() : null
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Todo: Create function to calculate emissions and send it back
// ^ this function will only be used after finishing the carbon calc

// Todo: Create function to delete emissions for user
