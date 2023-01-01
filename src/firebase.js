import firebase from "firebase/compat/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBtAIckDldqdinNfzAzsxQsgJslvmIt5e0",
  authDomain: "netflix-clone-b6966.firebaseapp.com",
  projectId: "netflix-clone-b6966",
  storageBucket: "netflix-clone-b6966.appspot.com",
  messagingSenderId: "376391846236",
  appId: "1:376391846236:web:9b7b20387894a7bb849999",
  measurementId: "G-HM8Y8QPC9G",
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();
export default storage;
