import bcrypt from "bcryptjs";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

const userRouter = express.Router();

// userRouter.get(
//   "/seed",
//   expressAsyncHandler(
//     async((request, response) => {
//       response.send("Created User");
//     })
//   )
// );

userRouter.post(
  "/signIn",
  expressAsyncHandler(async (request, response) => {
    const user = await User.findOne({ email: request.body.email });

    if (user) {
      if (bcrypt.compareSync(request.body.password, user.password)) {
        response.send({
          _id: user._id,
          email: user.email,
          token: generateToken(user),
        });

        return;
      } else {
        response.status(401).send({ message: "Invalid Email or Password" });
      }
    } else {
      response.status(401).send({ message: "Invalid Email or Password" });
    }
  })
);

userRouter.post(
  "/signUp",
  expressAsyncHandler(async (request, response) => {
    const user = await User.findOne({ email: request.body.email });

    if (user) {
      response.status(401).send({ message: "The email address already exist" });
    } else {
      const newUser = new User({
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 8),
      });

      const createdUser = await newUser.save();

      response.send({
        _id: createdUser._id,
        email: createdUser.email,
        token: generateToken(createdUser),
      });
    }
  })
);

export default userRouter;
