import React from "react";
import Book from "./book";
import { useAuthState } from "../firebase";
import UserAddress from "./UserAddress";
import styled from "styled-components";

const StyledBookAddr = styled.div`
  border: 1px solid #ddd;
  display: inline-flex;
`;

export default function MyBooks({ library, updateBook, deleteBook, usersArr }) {
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
        if (val.owner === userId && !val.requested) {
          console.log(val);
          return <Book key={id} book={val} updateBook={updateBook} deleteBook={deleteBook} />;
        }
        return null;
      })}
      <h3>Requested:</h3>
      {library.map((val, id) => {
        if (val.requester && val.requester === userId && !val.received && !val.sent) {
          return <Book key={id} book={val} updateBook={updateBook} deleteBook={deleteBook} />;
        }
        return null;
      })}
      <h3>To be sent:</h3>
      {library.map((val, id) => {
        if (val.owner === userId && val.requested && !val.sent) {
          return (
            <StyledBookAddr key={id}>
              <Book book={val} updateBook={updateBook} deleteBook={deleteBook} />
              <UserAddress userId={val.requester} usersArr={usersArr} />
            </StyledBookAddr>
          );
        }
        return null;
      })}
      <h3>Sent (in transit):</h3>
      {library.map((val, id) => {
        if ((val.owner === userId || val.requester === userId) && val.sent && !val.received) {
          return <Book key={id} book={val} updateBook={updateBook} deleteBook={deleteBook} />;
        }
        return null;
      })}
      <h3>They Received:</h3>
      {library.map((val, id) => {
        if (val.owner === userId && val.sent && val.received) {
          return <Book key={id} book={val} updateBook={updateBook} deleteBook={deleteBook} />;
        }
        return null;
      })}
      <h3>I Recieved:</h3>
      {library.map((val, id) => {
        if (val.requester === userId && val.sent && val.received) {
          return <Book key={id} book={val} updateBook={updateBook} deleteBook={deleteBook} />;
        }
        return null;
      })}
    </div>
  );
}
