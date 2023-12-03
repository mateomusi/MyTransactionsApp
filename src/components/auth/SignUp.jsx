import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { auth, userCollection, db } from "../../firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        // ... otros datos del usuario que quieras guardar
      };

      // Guardar datos en Firestore
      const userDocRef = doc(db, "users", userData.uid);
      await setDoc(userDocRef, userData);

      // Resto de la lógica después del registro exitoso
    } catch (error) {
      // Manejar errores
    }
  };

  return (
    <div className="sign-in-container-box">
      <form className="sign-in-container-form" onSubmit={signUp}>
        <h1>Create an Account</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
