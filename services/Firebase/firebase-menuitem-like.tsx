import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import FirebaseAuthManager from "./firebase-auth";
class FirebaseMenuItemFavouriteService {
  public static shared: FirebaseMenuItemFavouriteService =
    new FirebaseMenuItemFavouriteService();

  dataCollection = collection(db, "MenuItemFavourite");
  docRef = doc(this.dataCollection, "MenuItemFavourite");

  private allItemsAndLikes: Map<String, Array<String>> = new Map<
    string,
    Array<String>
  >();

  private lastFetched: Date = new Date();
  private authManager = new FirebaseAuthManager();

  private constructor() {
    this.getAllItemsAndLikes().then((data) => {
      this.allItemsAndLikes = data;
      this.lastFetched = new Date();
    });
  }

  private async getAllItemsAndLikes() {
    const docSnap = await getDoc(this.docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.allItemsAndLikes = new Map<String, Array<String>>(
        Object.entries(data)
      );

      console.log("All items and likes fetched:", this.allItemsAndLikes);

      return this.allItemsAndLikes;
    } else {
      return new Map<String, Array<String>>();
    }
  }

  private async updateAllItemsAndLikes(whenOlderThanMinutes: number = 5) {
    const now = new Date();
    const diff = now.getTime() - this.lastFetched.getTime();
    const minutes = diff / 1000 / 60;

    if (minutes > whenOlderThanMinutes) {
      await this.getAllItemsAndLikes().then((data) => {
        this.allItemsAndLikes = data;
        this.lastFetched = new Date();
      });
    }
  }

  public getTotalLikesForItem(itemId: string) {
    const itemLikes = this.allItemsAndLikes.get(itemId);
    if (!itemLikes) {
      return 0
    }
    return itemLikes.length;
  }

  public addLikeToItem(itemId: string) {
    const userId = this.authManager.getCurrentUserUID();

    if (!userId) {
      return new Error("No user signed in");
    }

    const item = this.allItemsAndLikes.get(itemId);

    if (item) {
      this.allItemsAndLikes.get(itemId)?.push(userId);
    } else {
      this.allItemsAndLikes.set(itemId, [userId]);
    }

    updateDoc(this.docRef, {
      [itemId]: arrayUnion(userId),
    });

    return this.getTotalLikesForItem(itemId);
  }

  public removeLikeFromItem(itemId: string) {
    const userId = this.authManager.getCurrentUserUID();

    if (!userId) {
      return new Error("No user signed in");
    }

    const item = this.allItemsAndLikes.get(itemId);

    if (item) {
      const arrayWithoutUser = this.allItemsAndLikes.get(itemId)!.filter((value) => value !== userId)
      this.allItemsAndLikes.set(itemId, arrayWithoutUser) ;
    } else {
      console.warn(
        "Tried to remove like from item that doesn't exist in the database."
      );
    }

    updateDoc(this.docRef, {
      [itemId]: arrayRemove(userId),
    });

    return this.getTotalLikesForItem(itemId);
  }

  public doesUserLikeItem(itemId: string) {
    const userId = this.authManager.getCurrentUserUID();
    if (!userId) {
      return false
    }
    return this.allItemsAndLikes.get(itemId)?.includes(userId) || false;
  }
}

export default FirebaseMenuItemFavouriteService.shared;
