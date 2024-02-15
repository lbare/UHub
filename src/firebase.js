import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ17Nf7JOwJAItWRetrAWp2THjE0epdEg",
  authDomain: "uhub-b1a4d.firebaseapp.com",
  projectId: "uhub-b1a4d",
  storageBucket: "uhub-b1a4d.appspot.com",
  messagingSenderId: "37094280542",
  appId: "1:37094280542:web:d11e9fb832f560cba853cf",
  measurementId: "G-SCK4ZNCYEF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

class PopulateJsonFireStore {
  // class constructor
  constructor() {
    console.time("Time taken");
    this.db = firebase.firestore();
    // Obtain the relative path, method type, collection name arguments provided through
    const [, , filepath, type, collectionname] = process.argv;

    // Obtain the absolute path for the given relative
    this.absolutepath = resolve(process.cwd(), filepath);

    // Obtain the firestore method type
    this.type = type;

    // Obtain the firestore method type
    this.collectionname = collectionname;

    // Lets make sure the right firestore method is used.
    if (this.type !== 'set' && this.type !== 'add') {
      console.error(`Wrong method type ${this.type}`)
      console.log('Accepted methods are: set or add');
      this.exit(1);
    }

    // If file path is missing
    if (this.absolutepath == null || this.absolutepath.length < 1){
      console.error(`Make sure you have file path assigned ${this.absolutepath}`)
      this.exit(1);
    }

    // If collection name not set
    if (this.collectionname == null || this.collectionname.length < 1){
      console.error(`Make sure to specify firestore collection ${this.collectionname}`)
      this.exit(1);
    }


    console.log(`ABS: FILE PATH ${this.absolutepath}`);
    console.log(`Type: method is ${this.type}`);
  }



  // The populate function
  // uploads the json data to firestore
  async populate() {
    // initialize our data array
    let data = [];

    // Get data from json file using fs
    try {
      data = JSON.parse(fs.readFileSync(this.absolutepath, {}), 'utf8');
    } catch (e) {
      console.error(e.message);
    }

    //data.forEach((item) => console.log(item));
    // loop through the data
    // Populate Firestore on each run
    // Make sure file has atleast one item.
    if (data.length < 1) {
      console.error('Make sure file contains items.');
    }
    var i = 0;
    for (var item of data) {
      console.log(item);
      try {
        this.type === 'set' ? await this.set(item) : await this.add(item);
      } catch (e) {
        console.log(e.message)
        this.exit(1);
      }
      // Successfully got to end of data;
      // print success message
      if (data.length - 1 === i) {
        console.log(`**************************\n****SUCCESS UPLOAD*****\n**************************`);
        console.timeEnd("Time taken");
        this.exit(0);
      }

      i++;
    }

  }

  // Sets data to firestore database
  // Firestore auto generated IDS
  add(item) {
    console.log(`Adding item with id ${item.id}`);
    return this.db.collection(this.collectionname).add(Object.assign({}, item))
    .then(() => true)
    .catch((e) => console.error(e.message));
  }

  // Set data with specified ID
  // Custom Generated IDS
  set(item) {
    console.log(`setting item with id ${item.id}`);
    return this.db.doc(`${this.collectionname}/${item.id}`).set(Object.assign({}, item))
    .then(() => true)
    .catch((e) => console.error(e.message));
  }

  // Exit nodejs console
  exit(code) {
    return process.exit(code);
  }

}

// create instance of class
// Run populate function
const populateFireStore = new PopulateJsonFireStore();
populateFireStore.populate();