import "./App.css";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase.js";
import { useEffect, useState } from "react";
import Book from "./components/book";
import User from "./components/user";
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
  const [users, setUsers] = useState([]);
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
        {view === "library" && (
          <div>
            <h2>Books:</h2>
            {library.map((val, id) => {
              return <Book key={id} book={val} />;
            })}
          </div>
        )}
        {view === "users" && (
          <div>
            <h2>Users</h2>
            {users.map((val, id) => {
              return <User key={id} user={val} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
