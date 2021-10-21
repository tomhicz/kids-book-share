import React from "react";
import User from "./user";
//state

//hooks

//handlers

export default function Library({ usersArr }) {
  return (
    <div>
      <h2>Users</h2>
      {usersArr.map((val, id) => {
        return <User key={id} user={val} />;
      })}
    </div>
  );
}
