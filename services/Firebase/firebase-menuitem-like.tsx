import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

class FirebaseMenuItemFavouriteService {
  public static shared: FirebaseMenuItemFavouriteService =
    new FirebaseMenuItemFavouriteService();

  dataCollection = collection(db, "MenuItemFavourite");
  docRef = doc(this.dataCollection, "MenuItemFavourite");

  private allItemsAndLikes: Map<String, Set<String>> = new Map<
    string,
    Set<String>
  >();

  private lastFetched: Date = new Date();

  constructor() {
    this.getAllItemsAndLikes().then((data) => {
      this.allItemsAndLikes = data;
      this.lastFetched = new Date();
    });
  }

  private async getAllItemsAndLikes() {
    const docSnap = await getDoc(this.docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      this.allItemsAndLikes = new Map<String, Set<String>>(
        Object.entries(data)
      );
      return this.allItemsAndLikes;
    } else {
      return new Map<String, Set<String>>();
    }
  }

  private async updateAllItemsAndLikes(whenOlderThanMinutes: number = 5) {
    const now = new Date();
    const diff = now.getTime() - this.lastFetched.getTime();
    const minutes = diff / 1000 / 60;

    if (minutes > whenOlderThanMinutes) {
      await this.getAllItemsAndLikes().then((data) => {
        this.allItemsAndLikes = data;
      });
    }
  }

  public async getTotalLikesForItem(itemId: string) {
    await this.updateAllItemsAndLikes(5);
    return this.allItemsAndLikes.get(itemId)?.size || 0;
  }

  public async addLikeToItem(itemId: string, userId: string) {
    const item = this.allItemsAndLikes.get(itemId);

    if (item) {
      this.allItemsAndLikes.get(itemId)!.add(userId);
    } else {
      this.allItemsAndLikes.set(itemId, new Set<string>([userId]));
    }

    await updateDoc(this.docRef, {
      [itemId]: arrayUnion(userId),
    });
  }

  public async removeLikeFromItem(itemId: string, userId: string) {
    const item = this.allItemsAndLikes.get(itemId);

    if (item) {
      this.allItemsAndLikes.get(itemId)!.delete(userId);
    } else {
      console.warn(
        "Tried to remove like from item that doesn't exist in the database."
      );
    }

    await updateDoc(this.docRef, {
      [itemId]: arrayRemove(userId),
    });
  }
}

export default FirebaseMenuItemFavouriteService;
