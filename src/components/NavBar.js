import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../firebase";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  background-color: #264653;
  color: #ffe8d6;
  padding: 5px;
  header {
    font-size: 2rem;
    font-weight: bold;
  }
  a {
    color: white;
    text-decoration: none;
  }
`;

export default function NavBar(props) {
  //state
  const { user, isAuthenticated } = useAuthState();
  //hooks

  //handlers

  return (
    <StyledNavBar>
      <header className="App-header">Kids Book Share Library</header>
      <NavLink to="/">Library</NavLink> | <NavLink to="/mybooks">My Books</NavLink> |{" "}
      <NavLink to="/users">Users</NavLink> | <NavLink to="/addbook">Add Book</NavLink> |{" "}
      <NavLink to="/adduser">Update User</NavLink>
      {!isAuthenticated ? (
        <span>
          | <NavLink to="/login">Login</NavLink> | <NavLink to="/signup">Sign Up</NavLink>
        </span>
      ) : (
        ""
      )}{" "}
      <span>
        &nbsp;&nbsp;&nbsp; Welcome {user?.email} (Signed in: {isAuthenticated ? "yes" : "no"} )
      </span>
    </StyledNavBar>
  );
}
