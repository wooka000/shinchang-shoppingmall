import { userModel } from "../database/index.js";
import bcrypt from "bcrypt";

class UserService {
  // 본 파일의 맨 아래에서, new UserService(userModel) 하면, 이 함수의 인자로 전달됨
  async findUserById(userId) {
    const user = await userModel.findUserById(userId);
    return user;
  }

  async findAll() {
    return userModel.findAll();
  }
  // 회원가입
  async addUser(userInfo) {
    // 이메일 중복 확인
    const user = await userModel.findByEmail(userInfo.email);
    if (user) {
      throw new Error(
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요."
      );
    }

    // 비밀번호 해쉬화(암호화)
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);

    const newUserInfo = { ...userInfo, password: hashedPassword };

    // db에 저장
    const createdNewUser = await userModel.create(newUserInfo);

    return createdNewUser;
  }
}

const userService = new UserService(userModel);

export { userService };
