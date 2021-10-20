import React from "react";

export default function book({ book }) {
  //state
  console.log("PROPS", book);
  //hooks

  //handlers

  return (
    <div>
      Title: {book.title}
      Author: {book.author}
      Available: {!book.requested ? "yes" : "no"}
    </div>
  );
}
