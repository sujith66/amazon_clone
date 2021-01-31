import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";
import amazonlogo from "../../images/amazon-logo.png";

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.currentTarget.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.currentTarget.value);
  };

  const loginUser = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email,password).
    then(auth=>{
      if(auth){
        history.push('/')
      }
    }).catch(err => { throw new Error(err)})
  };

  const registerUser = () => {

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          history.push("/");
        }
      })
      .catch((err) => {
        throw new Error(err);
      });
  };
  return (
    <div className="login">
      <Link to="/">
        <img className="login__image" src={amazonlogo} />
      </Link>
      <div className="login__container">
        <form>
          <h1 className="login__header">Login</h1>
          <h4>Email</h4>
          <input type="text" value={email} onChange={handleInputChange} />

          <h4>Password</h4>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />

          <button type="submit" className="login__btn" onClick={loginUser}>
            Sign in
          </button>

          <p className="login__privacyNote">
            By continuing, you agree to Amazon Fake Clone's Conditions of Use
            and Privacy Notice.
          </p>

          <button className="login__createBtn" onClick={registerUser}>
            Create an Amazon account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
