import React, { useState } from "react";
import styled from "styled-components";

import { doc, updateDoc } from "firebase/firestore";
import { db, useAuthState } from "../firebase";
import { useHistory } from "react-router-dom";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 1rem auto;
  max-width: 80rem;
  gap: 10px;
`;

export default function AddUser() {
  //state
  const { user } = useAuthState();
  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: user.email,
    booksborrowed: 0,
    bookslent: 0,
    rating: 0,
  });

  //hooks

  //handlers
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();

    async function addToDb() {
      try {
        const docRef = updateDoc(doc(db, "users", user.uid), inputs);
        //const docRef = await addDoc(collection(db, "users"), inputs);
        console.log("Document updated with ID: ", docRef.id);
        history.push("/users");
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    }
    addToDb();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          required
          type="text"
          name="username"
          value={inputs.username || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Email:
        <input readOnly type="text" name="email" value={inputs.email || ""}></input>
      </label>
      <label>
        Street 1:
        <input
          required
          type="text"
          name="street1"
          value={inputs.street1 || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Street 2:
        <input
          type="text"
          name="street2"
          value={inputs.street2 || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        City:
        <input type="text" name="city" value={inputs.city || ""} onChange={handleChange}></input>
      </label>
      <label>
        Postcode:
        <input
          type="text"
          name="postcode"
          value={inputs.postcode || ""}
          onChange={handleChange}
        ></input>
      </label>

      <input type="submit" />
    </StyledForm>
  );
}
