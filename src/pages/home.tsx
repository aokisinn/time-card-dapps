import React, { Component } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";
import { isLoginState } from "@/atoms/login";

export default function Home() {
  const isLogin = useRecoilValue(isLoginState);
  const user = useRecoilValue(userState);
  return <>{user.walletAddress}</>;
}
