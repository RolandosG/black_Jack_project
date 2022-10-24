import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import { sendGridHtmlTemplate } from "./sendGrid.js";

import sgMail from "@sendgrid/mail";

let codeGenerator = "";
let emailSentCode = "";
let nameSentCode = "";

const getVerificationCode = async (req, res) => {
  const { name, email} = req.body;

  if ((!name, !email)) {
    throw new BadRequestError("Please provide all values");
  }

  //Check if user is already exist in database
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  let generateCode = "B";

  for (let i = 0; i < 5; i++) {
    generateCode += Math.floor(Math.random() * 10);
  }

  codeGenerator = generateCode;
  emailSentCode = email;
  nameSentCode = name;

  //Create email to send
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const sendGrid = sendGridHtmlTemplate(name, codeGenerator);

  //Create message to send
  const msg = {
    to: email, // Change to your recipient
    from: "dangleminhnhat.brvt@gmail.com", // Change to your verified sender
    subject: "Blackjack Verification Code",
    html: sendGrid,
  };

  //Send email
  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(StatusCodes.OK).json({codeGenerator});
};

//REGISTER USER ROUTE
const register = async (req, res) => {
  const { name, email, password, verificationCode } = req.body;

  //Check if user has filled all fields
  if ((!name, !email, !password, !verificationCode)) {
    throw new BadRequestError("Please provide all values");
  }

  //Check password length:
  if (password.length < 8) {
    throw new BadRequestError("Password must contain at least 8 characters");
  }

  //Check if user is already exist in database
  const userAlreadyExist = await User.findOne({ email });
  if (userAlreadyExist) {
    throw new BadRequestError("Email already in use");
  }

  //Check for email send verification
  if(email !== emailSentCode){
    throw new BadRequestError("Please use verified email!");
  }

  //Check for email send verification
  if(name !== nameSentCode){
    throw new BadRequestError("Please use verified name!");
  }

  //Check email verification
  if (verificationCode !== codeGenerator) {
    throw new BadRequestError("Verification code invalid!");
  }

  //Create user and save to MongoDB
  const user = await User.create({ name, email, password });

  //Create token for authorization
  const token = user.createJWT();

  //Send back user to front-end
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      lastName: user.lastName,
      location: user.location,
      balance: user.balance,
    },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

const updateUser = async (req, res) => {
  const { name, lastName, location } = req.body;

  //Don't update user if the user don't provide all values
  if (!name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  //Find user in database
  const user = await User.findOne({ _id: req.user.userId });

  //Update user
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  //Save update
  await user.save();

  //Re-generate token
  const token = user.createJWT();

  //Send back data
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
};

export { register, login, updateUser, getVerificationCode };
