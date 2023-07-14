import { Router } from "express";
import { userService } from "../services/index.js";
import { loginRequired, adminRequired } from "../middlewares/index.js";

const userRouter = Router();

function nextError(callback) {
  return async (req, res, next) => {
    await callback(req, res, next).catch(next);
  };
}

userRouter.post("/register", async (req, res, next) => {
  try {
    console.log(req.body);
    const newUser = await userService.addUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.post("/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 로그인 진행 (로그인 성공 시 jwt 토큰을 프론트에 보내 줌)
    const userToken = await userService.getUserToken({ email, password });

    // jwt 토큰을 프론트에 보냄 (jwt 토큰은, 문자열임)
    res.status(200).json(userToken);
  } catch (error) {
    next(error);
  }
});

// 전체 유저 목록을 가져옴
userRouter.get(
  "/userlist",
  loginRequired,
  adminRequired,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userService.getUsers();

      // 사용자 목록(배열)을 JSON 형태로 프론트에 보냄
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }
);

// 사용자 정보 수정
// ex) /api/users/abc12345 로 요청하면 req.params.userId는 'abc12345' 문자열로 됨
userRouter.patch("/my", loginRequired, async function (req, res, next) {
  try {
    // token으로부터 id를 가져옴
    const userId = req.currentUserId;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const fullName = req.body.name;
    const password = req.body.password;
    const postalCode = req.body.postalCode;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const phoneNumber = req.body.phoneNumber;
    const role = req.body.role;
    const profileImage = req.body.profileImage;

    // body data로부터, 확인용으로 사용할 현재 비밀번호를 추출함.
    const currentPassword = req.body.currentPassword;

    // currentPassword 없을 시, 진행 불가
    if (!currentPassword) {
      throw new Error("정보를 변경하려면, 현재의 비밀번호가 필요합니다.");
    }

    const userInfoRequired = { userId, currentPassword };

    // 위 데이터가 undefined가 아니라면, 즉, 프론트에서 업데이트를 위해
    // 보내주었다면, 업데이트용 객체에 삽입함.
    const toUpdate = {
      ...(fullName && { fullName }),
      ...(password && { password }),
      ...(address1 && { address1 }),
      ...(address2 && { address2 }),
      ...(postalCode && { postalCode }),
      ...(phoneNumber && { phoneNumber }),
      ...(profileImage && { profileImage }),
      ...(role && { role }),
    };

    // 사용자 정보를 업데이트함.
    const updatedUserInfo = await userService.setUser(
      userInfoRequired,
      toUpdate
    );

    // 업데이트 이후의 유저 데이터를 프론트에 보내 줌
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  "/my",
  loginRequired,
  nextError(async (req, res, next) => {
    const userId = req.currentUserId;
    const user = await userService.findUserById(userId);

    res.json(user);
  })
);

userRouter.delete(
  "/my",
  loginRequired,
  nextError(async (req, res, next) => {
    const userId = req.currentUserId;
    await userService.deleteUser(userId);

    res.status(204).end();
  })
);

// 사용자 삭제
userRouter.delete(
  "/user/:userId",
  loginRequired,
  adminRequired,
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      await userService.deleteUser(userId);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
);

export { userRouter };
