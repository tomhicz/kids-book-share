import "./App.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from "react";
import Book from "./components/book";
import User from "./components/user";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: "kids-book-share.firebaseapp.com",
  projectId: "kids-book-share",
  storageBucket: "kids-book-share.appspot.com",
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

//Methods
// const createGroceryList = (userName) => {
//   return db.collection('groceryLists')
//       .add({
//           created: firebase.firestore.FieldValue.serverTimestamp(),
//           users: [{ name: userName}]
//       });
// };

function App() {
  //State
  const [users, setUsers] = useState([]);
  const [library, setLibrary] = useState([]);

  //Hooks
  useEffect(() => {
    async function getLibrary() {
      const libArray = [];
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => {
        libArray.push(doc.data());
        console.log(`${doc.id} => ${doc.data().title}`);
      });
      setLibrary(libArray);
    }
    getLibrary();
  }, []);
  useEffect(() => {
    async function getUsers() {
      const userArray = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        userArray.push(doc.data());
        console.log(`${doc.id} => ${doc.data().username}`);
      });
      setUsers(userArray);
    }
    getUsers();
  }, []);

  // useEffect(() => {
  //   async function testDb() {
  //     try {
  //       const docRef = await addDoc(collection(db, "users"), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815,
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   }
  //   testDb();
  // }, []);
  return (
    <div className="App">
      <header className="App-header">Kids Book Share Library</header>
      <div>
        <h2>Books:</h2>
        {library.map((val, id) => {
          return <Book key={id} book={val} />;
        })}
        <h2>Users</h2>
        {users.map((val, id) => {
          return <User key={id} user={val} />;
        })}
      </div>
    </div>
  );
}

export default App;
