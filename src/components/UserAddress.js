import React from "react";
import styled from "styled-components";

const StyledAddress = styled.div`
  padding: 0.3rem;
  text-align: left;
  background-color: rgb(250, 250, 250);
  h4 {
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
  }
`;

export default function UserAddress({ userId, usersArr }) {
  //state
  //methods
  console.log(userId);
  //usersArr.forEach((val) => console.log(val));
  console.log(usersArr.filter((val) => val.id === userId));
  const userDetails = usersArr
    .filter((val) => val.id === userId)
    .map((res) => {
      return (
        <StyledAddress key={res.id}>
          <h4>Please send to:</h4>
          <div>{res.username}</div>
          <div>{res.street1}</div>
          <div>{res.street2}</div>
          <div>{res.city}</div>
          <div>{res.postcode}</div>
        </StyledAddress>
      );
    });
  //hooks

  return userDetails;
}
