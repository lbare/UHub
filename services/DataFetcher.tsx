import { getDocs, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { collection } from "firebase/firestore";
import { Building, buildingExamples } from "../models/Building";

type OTP = {
  createdAt: Date;
  otp: string;
};
class DataFetcher {

  getOTPforEmail(email: string){
    const otpCollection = collection(db, "otps");
    const docRef = doc(otpCollection, email);

    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const otp = docSnap.data() as OTP;
      } else {

      }
    });

    return Promise.resolve("123456");
  }
}

export const addBuildingsToFirebase = async () => {
  try {
    const buildingsRef = collection(db, "Building:V2");
    for (const building of buildingExamples) {
      await addDoc(buildingsRef, building);
    }
  } catch (error) {
    console.error("Error adding building: ", error);
  }
};

export default DataFetcher;
