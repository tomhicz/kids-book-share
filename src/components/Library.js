import React from "react";
import Book from "./book";
//state

//hooks

//handlers

export default function Library({ library, updateBook, deleteBook }) {
  return (
    <div>
      <h2>Library:</h2>
      {library.map((val, id) => {
        if (!val.received) {
          return <Book key={id} book={val} updateBook={updateBook} deleteBook={deleteBook} />;
        }
        return null;
      })}
    </div>
  );
}
