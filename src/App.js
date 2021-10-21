import "./App.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import { useEffect, useState } from "react";

import Library from "./components/Library";
import Users from "./components/Users";
import AddBook from "./components/addBook";

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
  const [usersArr, setUsers] = useState([]);
  const [library, setLibrary] = useState([]);
  const [view, setView] = useState("library");

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
  }, [view]);
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
  }, [view]);

  return (
    <div className="App">
      <header className="App-header">Kids Book Share Library</header>
      <div>
        <button onClick={() => setView("addbook")}>Add a Book</button>
        <button onClick={() => setView("library")}>Library</button>
        <button onClick={() => setView("users")}>Show Users</button>
        {view === "addbook" && <AddBook setView={setView} />}
        {view === "library" && <Library library={library} />}
        {view === "users" && <Users usersArr={usersArr} />}
      </div>
    </div>
  );
}

export default App;
