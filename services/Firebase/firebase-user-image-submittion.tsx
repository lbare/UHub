// First, ensure your Firebase config is set up correctly for the modular version

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

class FirebaseUserImageService {
  private generateUID(): string {
    return Math.random().toString(36).substring(2);
  }

  async uploadImageAsync(vendorName: string, uri: string) {
    // Generate UID
    const uid = this.generateUID();

    const imageName = `user_submittions/${uid}.jpg`; // Creating a unique name for the image
    const storageRef = ref(storage, imageName);

    // Upload the file and metadata
    const colRef = collection(db, "UserSubmissions");
    const docRef = doc(colRef, uid);

    const response = await fetch(uri);
    const blob = await response.blob();

    return await uploadBytes(storageRef, blob).then(async (_) => {
      const downloadURL = await getDownloadURL(storageRef);

      await setDoc(docRef, {
        vendor: vendorName,
        image: imageName,
        downloadURL: downloadURL,
        date: new Date(),
      });
      return true;
    });
  }
}

export default FirebaseUserImageService;
