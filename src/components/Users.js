import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "../firebase";

import User from "./user";
//state

//hooks

//handlers

export default function Library({ usersArr }) {
  const { user } = useAuthState();
  console.log(user);

  return (
    <div>
      <h1>Welcome {user?.email}</h1>
      <h2>Users</h2>
      {usersArr.map((val, id) => {
        return <User key={id} user={val} />;
      })}
      <button onClick={() => signOut(getAuth())}>Sign out</button>
    </div>
  );
}
