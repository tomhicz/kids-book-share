import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../firebase";
import { getAuth, signOut } from "firebase/auth";
import styled from "styled-components";
import logo from "../assets/logo.png";

const StyledNavBar = styled.nav`
  background-color: #7b56c4;
  background-image: url(${logo});
  background-size: contain;
  background-repeat: no-repeat;

  color: #fefefe;
  padding: 5px;
  header {
    font-size: 2rem;
    font-weight: bold;
  }
  a {
    color: white;
    text-decoration: none;
  }
  a.needAuth {
    color: ${(props) => (props.isAuth ? "white" : "darkgray")};
  }
`;

export default function NavBar(props) {
  //state
  const { user, isAuthenticated } = useAuthState();
  //hooks

  //handlers

  return (
    <StyledNavBar isAuth={isAuthenticated}>
      <header className="App-header">Kids Book Share Library</header>
      <NavLink to="/">Library</NavLink> |{" "}
      <NavLink className="needAuth" to="/mybooks">
        My Books
      </NavLink>{" "}
      |{" "}
      <NavLink className="needAuth" to="/addbook">
        Add Book
      </NavLink>
      &nbsp;&nbsp;
      {"   [ "}
      <NavLink className="needAuth" to="/users">
        Users
      </NavLink>{" "}
      |{" "}
      <NavLink className="needAuth" to="/adduser">
        Update User
      </NavLink>
      {" ] "}
      <span>
        {isAuthenticated ? (
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome {user?.email.slice(0, 3)}...@...com{" "}
            <button onClick={() => signOut(getAuth())}>Sign out</button>
          </span>
        ) : (
          <span>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<NavLink to="/login">Login</NavLink> |{" "}
            <NavLink to="/signup">Sign Up</NavLink>
          </span>
        )}
      </span>
    </StyledNavBar>
  );
}
