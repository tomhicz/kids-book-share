import React from "react";
import Book from "./book";
//state

//hooks

//handlers

export default function Library({ library, updateBook }) {
  return (
    <div>
      <h2>Books:</h2>
      {library.map((val, id) => {
        return <Book key={id} book={val} updateBook={updateBook} />;
      })}
    </div>
  );
}
