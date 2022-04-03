import { supabase } from "@/utils/supabaseClient";
import { ethers } from "ethers";
import { useState, useCallback } from "react";
declare let window: any;

type loginState = "Stay" | "Loading" | "Sucess" | "No MetaMask";

export default function useMataMaskLogin() {
  const [loginState, setLoginState] = useState<loginState>("Stay");
  const [walletAddress, setWalletAddress] = useState("");

  const getNonce = useCallback(async (walletAddres: string) => {
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

    return nonce;
  }, []);

  const getJstToken = useCallback(
    async (walletAddres: string, nonce: string, signature: string) => {
      const response = await fetch("/api/auth/wallet", {
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
      const { token } = await response.json();

      return token;
    },
    []
  );

  // TODO ドキュメント要確認
  // TODO エラー処理
  const mataMaskLogin = useCallback(async () => {
    if (!window?.ethereum) {
      setLoginState("No MetaMask");
      return;
    }

    setLoginState("Loading");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    const walletAddres = await signer.getAddress();
    setWalletAddress(walletAddres);

    const nonce = await getNonce(walletAddres);

    const signature = await signer.signMessage(nonce);

    const token = await getJstToken(walletAddres, nonce, signature);
    await supabase.auth.setAuth(token);
    setLoginState("Sucess");
  }, [setLoginState, setWalletAddress, getNonce, getJstToken]);

  const getLoginUser = useCallback(async () => {
    const { data } = await supabase.from("users").select("*");
    if (data) {
      return data;
    }
    return null;
  }, []);

  return {
    loginState,
    walletAddress,
    mataMaskLogin,
    getLoginUser,
  };
}
