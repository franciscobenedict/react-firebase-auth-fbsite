import React, { useState, useContext } from "react";
import { AuthContext } from "../index";
import * as firebase from "firebase";
import { withRouter } from 'react-router-dom';

const Login = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('res', res);
          if (res.user) {
            Auth.setLoggedIn(true);
            history.push('/home');
          }
        })
        .catch(e => {
          setErrors(e.message);
        });
      })
  };
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          console.log('result', result);
          Auth.setLoggedIn(true);
          history.push('/home');
        })
        .catch(e => setErrors(e.message))
      })
  }

  return (
    <div className="main">
      <h1>Login</h1>
      <form onSubmit={e => handleForm(e)}>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="email"
          autoComplete="email"
        />
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="password"
          autoComplete="current-password"
        />

        <button type="submit">Login</button>
        <div className="error">{error}</div>

        <hr />
        <div>~ OR ~</div>
        <hr />

        <button onClick={() => signInWithGoogle()} className="googleBtn" type="button">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="logo"
          />
          Login With Google
        </button>
      </form>
    </div>
  );
};

export default withRouter(Login);
