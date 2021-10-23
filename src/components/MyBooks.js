import React from "react";
import Book from "./book";
import { useAuthState } from "../firebase";

export default function MyBooks({ library, updateBook }) {
  //state
  const { user } = useAuthState();
  const userId = `users/${user.uid}`;

  //hooks

  //handlers

  return (
    <div>
      <h2>My Books:</h2>
      <h3>Offering:</h3>
      {library.map((val, id) => {
        if (val.owner === userId) {
          console.log(val);
          return <Book key={id} book={val} updateBook={updateBook} />;
        }
      })}
      <h3>Requested:</h3>
      {library.map((val, id) => {
        if (val.requester && val.requester === userId) {
          return <Book key={id} book={val} updateBook={updateBook} />;
        }
      })}
      <h3>To be sent:</h3>
      {library.map((val, id) => {
        if (val.owner === userId && val.requested && !val.sent) {
          return <Book key={id} book={val} updateBook={updateBook} />;
        }
      })}
      <h3>Sent (in transit):</h3>
      {library.map((val, id) => {
        if (val.owner === userId && val.sent && !val.recieved) {
          return <Book key={id} book={val} updateBook={updateBook} />;
        }
      })}
    </div>
  );
}
