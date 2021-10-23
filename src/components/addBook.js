import React, { useState } from "react";
import styled from "styled-components";

import { collection, addDoc } from "firebase/firestore";
import { db, useAuthState } from "../firebase";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default function AddBook({ setView }) {
  //state
  const { user } = useAuthState();
  const [inputs, setInputs] = useState({
    conditionok: false,
    requested: false,
    sent: false,
    received: false,
    owner: `users/${user.uid}`,
  });

  //hooks
  // useEffect(() => {
  //   async function testDb() {
  //     try {
  //       const docRef = await addDoc(collection(db, "users"), {
  //         first: "Ada",
  //         last: "Lovelace",
  //         born: 1815,
  //       });
  //       console.log("Document written with ID: ", docRef.id);
  //     } catch (e) {
  //       console.error("Error adding document: ", e);
  //     }
  //   }
  //   testDb();
  // }, []);

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
        const docRef = await addDoc(collection(db, "books"), inputs);
        console.log("Document written with ID: ", docRef.id);
        setView("library");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    addToDb();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Title:
        <input
          required
          type="text"
          name="title"
          value={inputs.title || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Author:
        <input
          type="text"
          name="author"
          value={inputs.author || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Is the condition ok?
        <input
          required
          type="checkbox"
          name="conditionok"
          checked={inputs.conditionok || false}
          onChange={handleChange}
        />
      </label>
      <label>
        Requested (auto)
        <input
          type="checkbox"
          name="requested"
          checked={inputs.requested || false}
          onChange={handleChange}
        />
      </label>
      <label>
        Sent (auto)
        <input type="checkbox" name="sent" checked={inputs.sent || false} onChange={handleChange} />
      </label>
      <label>
        Arrived (auto?)
        <input
          type="checkbox"
          name="arrived"
          checked={inputs.arrived || false}
          onChange={handleChange}
        />
      </label>
      <label>
        Cover url (auto api)
        <input
          type="text"
          name="picurl"
          value={inputs.picurl || ""}
          onChange={handleChange}
        ></input>
      </label>
      <label>
        Owner (auto user)
        <input type="text" name="owner" value={inputs.owner || ""} readOnly></input>
      </label>
      <input type="submit" />
    </StyledForm>
  );
}
