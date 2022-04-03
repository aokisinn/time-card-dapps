import { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useRecoilValue } from "recoil";
import { userState } from "@/atoms/user";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const user = useRecoilValue(userState);

  return (
    <>
      <Header walletAddress={user.walletAddress} />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
