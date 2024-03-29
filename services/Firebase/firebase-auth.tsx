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

class FirebaseAuthManager {

  constructor(callbackOnAuthStateChanged?: (user: User | null) => void) {
    if (callbackOnAuthStateChanged) {
      onAuthStateChanged(this.getCurrentAuth(), (user) => {
        callbackOnAuthStateChanged(user);
      })
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

  public signUp(
    email: string,
    password: string
  ) {

    if (!email.endsWith("@uvic.ca")) {
      return Promise.reject(new Error("Email must be a valid UVic email"));
    }

    return createUserWithEmailAndPassword(this.getCurrentAuth(), email, password)
  }

  public signIn(
    email: string,
    password: string
  ) {
    return signInWithEmailAndPassword(this.getCurrentAuth(), email, password);
  }

  public signOut() {
    return signOut(this.getCurrentAuth());
  }
}

export default FirebaseAuthManager;
