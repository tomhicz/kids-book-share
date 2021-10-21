import React, { useEffect } from "react";
import styled from "styled-components";

const StyledBook = styled.div`
  border: 1px solid gray;
  margin: 2px;
  display: inline-block;
`;

export default function Book({ book, updateBook }) {
  //state
  //console.log("PROPS", book);

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
  function handleRequest() {
    console.log("book requested");
    updateBook(book.id, { requested: true });
  }

  return (
    <StyledBook>
      <div>Title: {book.title}</div>
      <div>Author: {book.author}</div>
      <div>Available: {!book.requested ? "yes" : "no"}</div>
      <button onClick={handleRequest}>RequestBook</button>
    </StyledBook>
  );
}
