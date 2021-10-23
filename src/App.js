import "./App.css";

import { collection, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { AuthContextProvider, db, useAuthState } from "./firebase.js";
import { useEffect, useState } from "react";

import Library from "./components/Library";
import Users from "./components/Users";
import AddBook from "./components/addBook";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";
import { SignUp } from "./Signup";
import { Login } from "./Login";
import NavBar from "./components/NavBar";
import AddUser from "./components/AddUser";
import MyBooks from "./components/MyBooks";

//Methods
// const createGroceryList = (userName) => {
//   return db.collection('groceryLists')
//       .add({
//           created: firebase.firestore.FieldValue.serverTimestamp(),
//           users: [{ name: userName}]
//       });
// };

//Authentication
const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  console.log(`AuthenticatedRoute: ${isAuthenticated}`);
  return (
    <Route
      {...props}
      render={(routeProps) =>
        isAuthenticated ? <C {...routeProps} {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState();
  console.log(`UnauthenticatedRoute: ${isAuthenticated}`);
  return (
    <Route
      {...props}
      render={(routeProps) =>
        !isAuthenticated ? <C {...routeProps} {...props} /> : <Redirect to="/" />
      }
    />
  );
};

function App() {
  //State
  const [usersArr, setUsers] = useState([]);
  const [library, setLibrary] = useState([]);

  //Hooks
  useEffect(() => {
    async function getLibrary() {
      const libArray = [];
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => {
        libArray.push({ id: doc.id, ...doc.data() });
        console.log(`${doc.id} => ${doc.data().title}`);
      });
      console.log("LIBARRAY", libArray);
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

  //handlers
  async function updateBook(bookId, payload) {
    console.log(`UPDATING book ${bookId} with ${payload}`);
    await updateDoc(doc(db, "books", bookId), payload);
  }
  async function deleteBook(bookId) {
    console.log(`DELETING book ${bookId}!`);
    await deleteDoc(doc(db, "books", bookId));
  }

  return (
    <AuthContextProvider>
      <Router>
        <header className="App-header">Kids Book Share Library</header>
        <NavBar />
        <Route exact path="/">
          <Library library={library} updateBook={updateBook} deleteBook={deleteBook} />
        </Route>
        <AuthenticatedRoute
          exact
          path="/mybooks"
          component={MyBooks}
          library={library}
          updateBook={updateBook}
          deleteBook={deleteBook}
        />
        <AuthenticatedRoute exact path="/users" component={Users} usersArr={usersArr} />
        <AuthenticatedRoute exact path="/addbook" component={AddBook} />
        <AuthenticatedRoute exact path="/adduser" component={AddUser} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
        <UnauthenticatedRoute exact path="/signup" component={SignUp} />
      </Router>
    </AuthContextProvider>
  );
}

export default App;
