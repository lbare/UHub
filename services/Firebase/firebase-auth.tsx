import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  onAuthStateChanged,
  signOut,
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
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(
          "Our servers seem to be down right now. Please try again later."
        );
      }
    });
  }

  public handleSignInWithOTP(email: string, otp: string) {
    return this.verifyOTP(email, otp).then((password) => {
      return this.dataFetcher.doesUserExist(email).then((exists) => {
        if (exists) {
          return this.signIn(email, password);
        } else {
          this.dataFetcher.addVerifiedUser(email);
          return this.signUp(email, password);
        }
      });
    });
  }

  public verifyOTP(email: string, otp: string) {
    const url = `https://uhub.rahuln.ca/verify?email=${email}&otp=${otp}`;
    return fetch(url, {
      method: "POST",
      cache: "no-cache",
    }).then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          return data.password;
        });
      } else {
        return Promise.reject(
          "Our servers seem to be down right now. Please try again later."
        );
      }
    });
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
