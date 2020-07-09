import React, { useState, useContext } from "react";
import { AuthContext } from "../index";
import * as firebase from "firebase";
import { withRouter } from 'react-router-dom';
import '../thirdparty/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = ({history}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrors] = useState("");
  const [confirmPassword, setComparePassword] = useState("");
  let passwordMatch = null;
  let charNumberValid = null;
  let specialCharValid = null;
  let numberValid = null;
  let uppercaseValid = null;
  let lowercaseValid = null;
  let checkValid = null;
  const Auth = useContext(AuthContext);
  const handleForm = e => {
    e.preventDefault();
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          console.log(res)
          // history.push('/reports')
          // if (res.user) Auth.setLoggedIn(true);
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
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        Auth.setLoggedIn(true);
        history.push('/home');
      })
      .catch(e => setErrors(e.message))
    })
  };

  const checkPassword = (event) => {
    // Password must be at least 8 chars
    password.length >= 8 ? charNumberValid = true :  charNumberValid = false;

    // Password must contain at least 1 special char
    const patternConfirmPassword = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/g;
    patternConfirmPassword.test(password) ? specialCharValid = true : specialCharValid = false;

    // Password must contain at least a capital letter
    const patternUppercaseValid = /[A-Z]/;
    patternUppercaseValid.test(password) ? uppercaseValid = true : uppercaseValid = false;

    // Password must contain at least a lowercase letter
    const patternLowercaseValid = /[A-Z]/;
    patternLowercaseValid.test(password) ? lowercaseValid = true : lowercaseValid = false;

    // Password must contain at least a number
    const patternNumberValid = /[0-9]/;
    patternNumberValid.test(password) ? numberValid = true : numberValid = false;

    checkFormValidity();
  }
  const comparePasswordFunc = (event) => {
    password === confirmPassword && password !== '' && confirmPassword !== '' ? passwordMatch = true : passwordMatch = false;

    checkFormValidity();
  };
  const checkFormValidity = () => {
    charNumberValid &&
    specialCharValid &&
    passwordMatch &&
    numberValid &&
    uppercaseValid &&
    lowercaseValid
    ? checkValid = true : checkValid = false;
  }
  console.log('checkValid', checkValid);

  return (
    <div className="main">
      <h1>Register</h1>
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
          onChange={e => setPassword(e.target.value)}
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          onBlur={checkPassword()}
        />
        <input
          onChange={e => setComparePassword(e.target.value)}
          name="confirmPassword"
          value={confirmPassword}
          type="password"
          placeholder="Confirm password"
          autoComplete="confirm-password"
          onBlur={comparePasswordFunc()}
        />
        <div className="validation">
          <div className="validator"><FontAwesomeIcon icon={charNumberValid ? 'check' : 'times'} className={`fa_icon ${charNumberValid ? "success" : "error"}`}/><p className="validation-item">Must be at least 8 characters</p></div>
          <div className="validator"><FontAwesomeIcon icon={passwordMatch ? 'check' : 'times'} className={`fa_icon ${passwordMatch ? "success" : "error"}`}/><p className="validation-item">Passwords must match</p></div>
          <div className="validator"><FontAwesomeIcon icon={specialCharValid ? 'check' : 'times'} className={`fa_icon ${specialCharValid ? "success" : "error"}`}/><p className="validation-item">At least 1 special character from @#$%&</p></div>
          <div className="validator"><FontAwesomeIcon icon={numberValid ? 'check' : 'times'} className={`fa_icon ${numberValid ? "success" : "error"}`}/><p className="validation-item">At least 1 number</p></div>
          <div className="validator"><FontAwesomeIcon icon={uppercaseValid ? 'check' : 'times'} className={`fa_icon ${uppercaseValid ? "success" : "error"}`}/><p className="validation-item">At least 1 uppercase</p></div>
          <div className="validator"><FontAwesomeIcon icon={lowercaseValid ? 'check' : 'times'} className={`fa_icon ${lowercaseValid ? "success" : "error"}`}/><p className="validation-item">At least 1 lowercase</p></div>
        </div>

        <button type="submit" disabled={ !checkValid }>Register</button>
        <div className="error">{error}</div>

        <hr />
        <div>~ OR ~</div>
        <hr />

        <button onClick={() => handleGoogleLogin()} className="googleBtn" type="button">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="logo" />
          Register With Google
        </button>
      </form>
    </div>
  );
};

export default withRouter(Register);
