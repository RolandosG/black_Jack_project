import React from "react";

import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const initialState = {
  isLoading: false,
  name: "",
  email: "",
  password: "",
  verificationCode: "",
  isMember: true,
};

function Register() {
  const navigate = useNavigate();

  const [values, setValues] = useState(initialState);
  const [displayVerification, setDisplayVerification] = useState(false);

  //global state and useNavigate
  const {
    user,
    isLoading,
    showAlert,
    displayAlert,
    setupUser,
    displayVerificationAlert,
    displayErrorAlert,
  } = useAppContext();

  const toggleLoginRegister = () => {
    setValues({ ...values, isMember: !values.isMember });

    setDisplayVerification(false);
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //Handler when user login
  const onSubmitHandler = (event) => {
    event.preventDefault();

    //Get data from input
    const { email, password } = values;

    //Check if data entered is valid
    if (!email || !password) {
      displayAlert();
      return;
    }

    //create current user and register that user to the database
    const currentUser = { email, password };
    setupUser({
      currentUser,
      endPoint: "login",
      alertText: "Login Successful! Redirecting...",
    });
  };

  //Handler when user want to register new account
  const onClickHandler = async (event) => {
    event.preventDefault();

    //Get data from input
    const { name, email, password, verificationCode } = values;
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //Check if data entered is valid
    if (!email || !password || !name) {
      displayAlert();
      return;
    }

    //Check password
    if (password.length < 8) {
      displayErrorAlert("Password must contain at least 8 characters");
      return;
    }

    //Check valid email
    if (!email.match(validRegex)) {
      displayErrorAlert("Please enter a valid email");
      return;
    }

    const currentUser = { name, email, password, verificationCode };

    if (!displayVerification) {
      try {
        await axios.post(`/api/v1/auth/getVerificationCode`, {
          name: name,
          email: email,
        });
      } catch (error) {
        displayErrorAlert("Email already in use");
        return;
      }

      //
      setDisplayVerification(true);
      displayVerificationAlert();
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  //If register success, navigate to dashboard
  useEffect(() => {
    if (user) {
      // setTimeout(() => {
      //   navigate("/");
      // }, 3000);
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmitHandler}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>

        {showAlert && <Alert />}

        {/* Name Input */}
        {!values.isMember & !displayVerification ? (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        ) : null}

        {/* Email Input */}
        {/* Password Input */}
        {!displayVerification && (
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
        )}

        {/* Password Input */}
        {!displayVerification && (
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
        )}

        {/* Verification Code Input */}
        {displayVerification && (
          <FormRow
            type="text"
            name="verificationCode"
            labelText="Verification Code"
            value={values.verificationCode}
            handleChange={handleChange}
          />
        )}

        {values.isMember ? (
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            Login
          </button>
        ) : (
          <button
            type="submit"
            className="btn btn-block"
            disabled={isLoading}
            onClick={onClickHandler}
          >
            {displayVerification ? "Register" : "Send verification code"}
          </button>
        )}

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            onClick={toggleLoginRegister}
            className="member-btn"
          >
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
}

export default Register;
