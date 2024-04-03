import { getDocs, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
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

    return getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        const otp = docSnap.data() as OTP;
        return otp.otp;
      }else{
        return Promise.reject("No OTP found for email");
      }
    });
  }

  doesUserExist(email: string){
    const vuCollection = collection(db, "VerifiedUsers");
    const docRef = doc(vuCollection, email);

    return getDoc(docRef).then((docSnap) => {
      return docSnap.exists();
    });
  }

  addVerifiedUser(email: string){
    const vuCollection = collection(db, "VerifiedUsers");
    const docRef = doc(vuCollection, email);
    return setDoc(docRef, {});
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
