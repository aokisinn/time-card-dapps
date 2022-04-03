import { atom } from "recoil";

export const isLoginState = atom({
  key: "login",
  default: false,
});
