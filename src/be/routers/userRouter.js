import { Router } from "express";
import User from "../database/schema/userSchema.js";

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  console.log("success POST");

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: [{ msg: "이미 존재하는 이메일입니다." }] });
    }

    user = new User({
      name,
      email,
      password,
    });
    await user.save();

    res.send("Success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export { userRouter };
