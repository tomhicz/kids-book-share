import React, { useEffect } from "react";

export default function Book({ book }) {
  //state
  console.log("PROPS", book);
  //hooks
  // useEffect(() => {
  //   async function getBookInfo() {
  //     const bookInfo = await fetch(
  //       `https://www.googleapis.com/books/v1/volumes?q=intitle:${book.title}&langRestrict=en&printType=books&projection=lite`
  //     );
  //     console.log("bookinfo:", bookInfo);
  //   }
  //   getBookInfo();
  // }, []);
  //handlers

  return (
    <div>
      Title: {book.title}
      Author: {book.author}
      Available: {!book.requested ? "yes" : "no"}
    </div>
  );
}
