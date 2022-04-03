import Layout from "@/components/Layout/Layout";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import useMataMaskLogin from "./useMataMaskLogin";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/user";
import { isLoginState } from "@/atoms/login";
import { useRouter } from "next/router";

export default function Login() {
  const { loginState, mataMaskLogin, getLoginUser } = useMataMaskLogin();
  const [_, setUser] = useRecoilState(userState);
  const [isLogin, setIsLogin] = useRecoilState(isLoginState);
  const router = useRouter();

  const getUser = useCallback(async () => {
    const user = await getLoginUser();
    setUser({
      walletAddress: user.wallet_address,
    });
    setIsLogin(true);
  }, [setUser, getLoginUser, setIsLogin]);

  useEffect(() => {
    if (loginState === "No MetaMask") {
      alert("metaMaskがインストールされてません");
    }
    if (loginState === "Sucess") {
      getUser();
    }
  }, [loginState, getUser]);

  useEffect(() => {
    if (!isLogin) return;
    router.push("/home");
  }, [isLogin, router]);

  return (
    <Layout>
      <Container
        fixed
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            paddingTop: "30%",
          }}
        >
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <LoadingButton
              variant="contained"
              size="large"
              loading={loginState === "Loading"}
              onClick={mataMaskLogin}
            >
              MataMask Login
            </LoadingButton>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
