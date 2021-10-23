import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthState } from "../firebase";

const StyledBook = styled.div`
  border: 1px solid gray;
  margin: 2px;
  display: inline-block;
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
`;

export default function Book({ book, updateBook, deleteBook }) {
  //state
  const { user, isAuthenticated } = useAuthState();
  let userId = null;
  if (user && user.uid) {
    userId = `users/${user.uid}`;
  }

  const [img, setImg] = useState("");

  //hooks
  useEffect(() => {
    async function getBookInfo() {
      if (!book.picurl) {
        let bookObj;
        const bookInfo = await fetch(
          `/volumes?q=intitle:${book.title}&langRestrict=en&printType=books&projection=lite`
        );
        bookInfo.text().then((text) => {
          bookObj = JSON.parse(text);
          //Use regex or spliec to remove edge=curl&
          console.log(bookObj.items[0].volumeInfo.imageLinks.smallThumbnail);
          setImg(bookObj.items[0].volumeInfo.imageLinks.smallThumbnail || "");
          updateBook(book.id, { picurl: bookObj.items[0].volumeInfo.imageLinks.smallThumbnail });
        });
      } else {
        setImg(book.picurl);
      }
    }
    getBookInfo();
  }, [book.title]);

  //handlers
  function handleRequest() {
    console.log("book requested");
    updateBook(book.id, { requested: true, requester: userId });
  }
  function handleCancelReq() {
    console.log("book request cancelled");
    updateBook(book.id, { requested: false, requester: null });
  }
  function handleSent() {
    console.log("book sent");
    updateBook(book.id, { sent: true });
  }
  function handleReceived() {
    console.log("book received");
    updateBook(book.id, { received: true });
  }
  function handleDelete() {
    console.log("book deleted");
    deleteBook(book.id);
  }

  return (
    <StyledBook>
      <div>Title: {book.title}</div>
      <img alt="" src={img} />
      <div>Author: {book.author}</div>
      <div>Available: {!book.requested ? "yes" : "no"}</div>
      <div className="buttons">
        <button
          onClick={handleRequest}
          disabled={!isAuthenticated || book.requested || book.owner === userId}
        >
          Request Book
        </button>
        <button
          onClick={handleCancelReq}
          disabled={!book.requested || book.sent || book.received || book.requester !== userId}
        >
          Cancel Request
        </button>
        <button
          onClick={handleSent}
          disabled={!book.requested || book.sent || book.owner !== userId}
        >
          Mark Sent
        </button>
        <button
          onClick={handleReceived}
          disabled={book.received || !book.sent || book.requester !== userId}
        >
          Mark Received
        </button>
        <button
          onClick={handleDelete}
          disabled={book.requested || book.sent || book.received || book.owner !== userId}
        >
          Delete!
        </button>
      </div>
    </StyledBook>
  );
}
