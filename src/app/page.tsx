// import LoginBanner from "@/components/app.login-banner";
"use client";
import OurServices from "@/components/content/content.ourService";
import OurCustomer from "@/components/footer/app.ourCustomers";
import Footer from "@/components/footer/app.footer";
import Banner from "@/components/header/header.login-banner";
import { useUserInformation } from "./context/context.userInformation";
import Content from "@/components/content/app.content";
import Header from "@/components/header/app.header";

export default function Home() {
  const { userInformation } = useUserInformation();
  const isLoggedIn = userInformation ? true : false;
  return (
    <div className="main relative flex justify-center">
      <Banner></Banner>
      <div className="absolute top-15 left-auto right-auto">
        <main className="grid grid-cols-6 gap-10">
          <div className="col-span-6 flex justify-end mb-40">
            <Header isLoggedIn={isLoggedIn}></Header>
          </div>
          <div className="col-span-4 flex justify-center">
            <Content isLoggedIn={isLoggedIn}></Content>
          </div>
          <div className="col-span-2 flex justify-center">
            <OurServices></OurServices>
          </div>
          <div className="col-span-6">
            <OurCustomer></OurCustomer>
          </div>
          <div className="col-span-6">
            <Footer></Footer>
          </div>
        </main>
      </div>
    </div>
  );
}
