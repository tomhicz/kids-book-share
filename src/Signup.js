import { useCallback } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const SignUp = () => {
  const history = useHistory();
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { email, password } = e.target.elements;
      const auth = getAuth();
      try {
        const userInfo = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const userUid = userInfo?.user.uid || null;
        //Create basic app user
        async function addBasicUser() {
          try {
            await setDoc(doc(db, "users", userUid), {
              email: userInfo.user.email,
            });
            console.log("Document written with ID: ", userUid);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        addBasicUser();

        //Go to signup page
        history.push("/adduser");
      } catch (e) {
        alert(e.message);
      }
    },
    [history]
  );

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="email" type="email" />
        <input name="password" placeholder="password" type="password" />
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};
