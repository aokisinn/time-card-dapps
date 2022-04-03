import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import TimeCard from "../components/TimeCard";
import { ethers } from "ethers";
declare let window: any;

export default function Home() {
  const [loginState, setLoginState] = useState("");
  const [addres, setAddres] = useState("No wallet Addres");

  const login = async () => {
    setLoginState("connecting to your wallet...");
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
    setAddres(walletAddres);

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
    // サインインメッセージ
    const signature = await signer.signMessage("hello world");
  };
  return (
    <div className="container" style={{ padding: "50px 0 100px 0" }}>
      <h1>{loginState}</h1>
      <h1>{addres}</h1>
      <button onClick={login}>ログイン MataMask</button>
    </div>
  );
}
