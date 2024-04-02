import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  UserCredential,
  onAuthStateChanged,
  signOut,
  Auth,
} from "firebase/auth";
import DataFetcher from "../DataFetcher";

class FirebaseAuthManager {

  dataFetcher = new DataFetcher();
  
  constructor(callbackOnAuthStateChanged?: (user: User | null) => void) {
    if (callbackOnAuthStateChanged) {
      onAuthStateChanged(this.getCurrentAuth(), (user) => {
        callbackOnAuthStateChanged(user);
      });
    }
  }

  private getCurrentAuth() {
    return getAuth();
  }

  private getCurrentUser(): User {
    const user = this.getCurrentAuth().currentUser;

    if (user) {
      return user;
    } else {
      throw new Error("No user is currently signed in");
    }
  }

  public getCurrentUserUID(): string | null {
    try {
      return this.getCurrentUser().uid;
    } catch (error) {
      return null;
    }
  }

  public signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(
      this.getCurrentAuth(),
      email,
      password
    );
  }

  public initiatePasswordlessSignIn(email: string) {
    console.log("Email is: " + email);
    const url = `https://uhub.rahuln.ca/test?email=${email}`;
    console.log("URL is: " + url);
    return fetch(
      url,
      {
        method: "POST",
        cache: "no-cache",
      }
    );
  }

  public verifyOTP(otp: string) {
    this.dataFetcher.getOTPforEmail(otp).then((otpFromDB) => {
      return otp === otpFromDB;
    });
  }

  public signIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.getCurrentAuth(), email, password);
  }

  public signOut() {
    return signOut(this.getCurrentAuth());
  }
}

export default FirebaseAuthManager;
