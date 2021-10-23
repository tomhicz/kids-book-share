import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledBook = styled.div`
  border: 1px solid gray;
  margin: 2px;
  display: inline-block;
`;

export default function Book({ book, updateBook }) {
  //state
  const [img, setImg] = useState("");

  //hooks
  // useEffect(() => {
  //   async function getBookInfo() {
  //     let bookObj;
  //     const bookInfo = await fetch(
  //       `/volumes?q=intitle:${book.title}&langRestrict=en&printType=books&projection=lite`
  //     );
  //     bookInfo.text().then((text) => {
  //       bookObj = JSON.parse(text);
  //       //Use regex or spliec to remove edge=curl&
  //       console.log(bookObj.items[0].volumeInfo.imageLinks.smallThumbnail);
  //       setImg(bookObj.items[0].volumeInfo.imageLinks.smallThumbnail || "");
  //     });
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
      {/* <img alt="" src={img} /> */}
      <div>Author: {book.author}</div>
      <div>Available: {!book.requested ? "yes" : "no"}</div>
      <button onClick={handleRequest}>RequestBook</button>
    </StyledBook>
  );
}
