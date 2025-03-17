import React from "react";
import SignUpForm from "./content.signup";
import HomePageMain from "./home.main";

interface IContentProps {
  isLoggedIn: boolean;
}

function Content(props: IContentProps) {
  if (props.isLoggedIn) {
    return <HomePageMain />;
  } else {
    return <SignUpForm></SignUpForm>;
  }
}

export default Content;
