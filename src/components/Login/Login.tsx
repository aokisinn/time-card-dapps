import Layout from "@/components/Layout/Layout";
import { Alert, AlertTitle, Grid } from "@mui/material";
import { Container } from "@mui/material";
import useMataMaskLogin from "./useMataMaskLogin";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";

export default function Login() {
  const { loginState, walletAddress, mataMaskLogin, getLoginUser } =
    useMataMaskLogin();

  useEffect(() => {
    if (loginState === "No MetaMask") {
      alert("metaMaskがインストールされてません");
    }
  }, [loginState]);

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
