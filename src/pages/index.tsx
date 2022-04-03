import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import TimeCard from "../components/TimeCard";
import { ethers } from "ethers";
import { Button, ButtonGroup } from "@material-ui/core";

declare let window: any;

export default function Home() {
  const [loginState, setLoginState] = useState("");
  const [mataMaskAddress, setMataMaskAddress] = useState("");

  const [userId, setUserId] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [token, setToken] = useState("");

  const login = async () => {
    setLoginState("matamask未接続");
    // MateMaskがあるか？
    if (!window?.ethereum) {
      setLoginState("No MetaMask");
      return;
    }

    // TODO 何やってるか後で見る
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    // ウォレットの情報を取得
    const signer = provider.getSigner();
    // アドレス
    const walletAddres = await signer.getAddress();
    setLoginState("matamask接続成功");
    setMataMaskAddress(walletAddres);
    // レスポンス
    const response = await fetch("/api/auth/nonce", {
      method: "POST",
      body: JSON.stringify({
        walletAddres,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const { nonce } = await response.json();

    // サインインメッセージ
    const signature = await signer.signMessage(nonce);

    // ユーザー情報取得
    const userResponse = await fetch("/api/auth/wallet", {
      method: "POST",
      body: JSON.stringify({
        walletAddress: walletAddres,
        nonce,
        signature,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(userResponse);

    const user = await userResponse.json();
    console.log(user);

    await supabase.auth.setAuth(user.token);
    setToken(user.token);
  };

  const checkUser = async () => {
    const { data, error } = await supabase.from("users").select("*");
    console.log(data);
    if (data) {
      setUserId(data[0]?.id || "");
      setUserAddress(data[0]?.wallet_address || "");
    }
  };
  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <h1>matamask 接続状況 : {loginState}</h1>
      <h1>matamask address : {mataMaskAddress}</h1>
      <button onClick={login}>ログイン MataMask</button>
      <hr />
      <br />
      <button onClick={checkUser}>チェックユーザー</button>
      <h1>ユーザーID: {userId}</h1>
      <h1>ユーザーアドレス: {userAddress}</h1>
      <h1>トークン: {token}</h1>
      <Button>sss</Button>
    </div>
  );
}
