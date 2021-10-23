import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthState } from "../firebase";

const StyledBook = styled.div`
  border: 1px solid gray;
  margin: 2px;
  display: inline-block;
`;

export default function Book({ book, updateBook }) {
  //state
  const { user } = useAuthState();
  const userId = `users/${user.uid}`;

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
    updateBook(book.id, { requested: true, requester: userId });
  }
  function handleSent() {
    console.log("book sent");
    updateBook(book.id, { sent: true });
  }
  function handleReceived() {
    console.log("book received");
    updateBook(book.id, { received: true });
  }

  return (
    <StyledBook>
      <div>Title: {book.title}</div>
      {/* <img alt="" src={img} /> */}
      <div>Author: {book.author}</div>
      <div>Available: {!book.requested ? "yes" : "no"}</div>
      <button onClick={handleRequest} disabled={book.requested || book.owner === userId}>
        Request Book
      </button>
      <button onClick={handleSent} disabled={book.sent || book.owner !== userId}>
        Mark Sent
      </button>
      <button
        onClick={handleReceived}
        disabled={book.received || !book.sent || book.requester !== userId}
      >
        Mark Received
      </button>
    </StyledBook>
  );
}
