import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthState } from "../firebase";

export default function NavBar(props) {
  //state
  const { user, isAuthenticated } = useAuthState();
  //hooks

  //handlers

  return (
    <>
      <NavLink to="/">Library</NavLink> | <NavLink to="/mybooks">My Books</NavLink> |{" "}
      <NavLink to="/users">Users</NavLink> | <NavLink to="/addbook">Add Book</NavLink> |{" "}
      <NavLink to="/adduser">Add User</NavLink>
      {!isAuthenticated ? (
        <span>
          | <NavLink to="/login">Login</NavLink> | <NavLink to="/signup">Sign Up</NavLink>
        </span>
      ) : (
        ""
      )}{" "}
      <span>
        Welcome {user?.email} (Signed in: {isAuthenticated ? "yes" : "no"} )
      </span>
    </>
  );
}
