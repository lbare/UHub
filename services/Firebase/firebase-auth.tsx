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
const { SHA256 } = require("crypto-js");

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

  private generatePasswordForEmail(email: string) {
    return SHA256(email + process.env.OUR_SECRET).toString();
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
    ).then(() => {
      return true;
    });
  }

  public initiatePasswordlessSignIn(email: string) {
    const url = `https://uhub.rahuln.ca/login?email=${email}`;
    return fetch(url, {
      method: "POST",
      cache: "no-cache",
    }).then((response) => {
      if(response.ok) {
        return response.json();
      } else {
        return Promise.reject("Failed to send OTP to email");
      }
    });
  }

  public handleSignInWithOTP(email: string, otp: string) {
    return this.verifyOTP(email, otp).then((success) => {
      if (success) {
        return this.dataFetcher.doesUserExist(email).then((exists) => {
          if (!exists) {
            this.dataFetcher.addVerifiedUser(email);
            return this.signUp(email, this.generatePasswordForEmail(email));
          } else {
            return this.signIn(email, this.generatePasswordForEmail(email));
          }
        });
      } else {
        return Promise.reject("Failed to verify OTP");
      }
    });
  }

  public verifyOTP(email: string, otp: string) {
    return this.dataFetcher
      .getOTPforEmail(email)
      .then((otpFromDB) => {
        return otp == otpFromDB;
      })
  }

  public signIn(email: string, password: string) {
    return signInWithEmailAndPassword(
      this.getCurrentAuth(),
      email,
      password
    ).then(() => {
      return true;
    });
  }

  public signOut() {
    return signOut(this.getCurrentAuth());
  }
}

export default FirebaseAuthManager;
