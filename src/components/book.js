import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuthState } from "../firebase";

const StyledBook = styled.div`
  border: 1px solid gray;
  background-color: #fffeec;
  margin: 2px;
  display: inline-block;
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  h3 {
    margin: 0;
    color: #264653;
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
        try {
          const bookInfo = await fetch(
            `/volumes?q=intitle:${book.title}&langRestrict=en&printType=books&projection=lite`
          );
          console.log('BOOK INFO', bookInfo);
          bookInfo.text().then((text) => {
            bookObj = JSON.parse(text);
            //Use regex or spliec to remove edge=curl&
            console.log('cover info', bookObj.items[0].volumeInfo.imageLinks.smallThumbnail);
            setImg(bookObj.items[0].volumeInfo.imageLinks.smallThumbnail || "");
            updateBook(book.id, { picurl: bookObj.items[0].volumeInfo.imageLinks.smallThumbnail });
          });
        } catch (error) {
          console.log('ERROR getting book cover info')
          console.error(error)
        }
      } else {
        setImg(book.picurl);
      }
    }
    getBookInfo();
  }, [book.title,  book.id, book.picurl, updateBook]);

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
      <h3>{book.title}</h3>
      <img alt="" src={img} />
      <div>By: {book.author}</div>
      <div>{!book.requested ? "Available" : "Not Available"}</div>
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
