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

    const secret = process.env.OUR_SECRET;

    if (!secret) {
      throw new Error("Our secret is not defined in the environment variables.");
    }

    if (SHA256(secret).toString() != "84a102db352320c893a16f10df0bd4533bed9ae00cc9f85f9e33c3f4bfb495e8") {
      throw new Error("Our secret is not correct.");
    }

    return SHA256(email + secret).toString();
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
        return Promise.reject("Our servers seem to be down right now. Please try again later.");
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
        if (otpFromDB == otp) {
          return true;
        }else{
          return Promise.reject("The OTP you entered is incorrect.");
        }
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
