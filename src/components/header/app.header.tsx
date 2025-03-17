import React from "react";
import SearchBox from "../header/home.searchBox";
import AccountCenter from "../header/home.AccountCenter";
import { ForgotPasswordProvider } from "@/app/context/context.forgotPassword";
import LoginForm from "./header.login";

interface IProps {
  isLoggedIn: boolean;
}

function Header(props: IProps) {
  if (props.isLoggedIn) {
    return (
      <div className="grid grid-cols-6 gap-x-10">
        <div className="col-span-5">
          <SearchBox></SearchBox>
        </div>
        <div className="col-span-1">
          <AccountCenter></AccountCenter>
        </div>
      </div>
    );
  } else {
    return (
      <ForgotPasswordProvider>
        <LoginForm></LoginForm>
      </ForgotPasswordProvider>
    );
  }
}

export default Header;
