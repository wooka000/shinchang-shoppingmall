import { Router } from "express";
// import User from "../database/schema/userSchema.js";
import { userService } from "../services/index.js";

const userRouter = Router();

userRouter.post("/register", async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// userRouter.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;

//   console.log("success POST");

//   try {
//     let user = await User.findOne({ email });
//     if (user) {
//       return res
//         .status(400)
//         .json({ error: [{ msg: "이미 존재하는 이메일입니다." }] });
//     }

//     user = new User({
//       name,
//       email,
//       password,
//     });
//     await user.save();

//     res.send("Success");
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

export { userRouter };
