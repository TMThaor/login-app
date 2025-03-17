import { useUserInformation } from "@/app/context/context.userInformation";
import React from "react";

const HomePageMain = () => {
  const { userInformation } = useUserInformation();
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-[#DCA245]">BẠN ĐÃ ĐĂNG NHẬP THÀNH CÔNG</p>
      <p>
        Chào mừng{" "}
        <span className="text-[#FDBA4D]">
          {userInformation?.content?.shopName}
        </span>{" "}
        đã quay trở lại với hệ thống
      </p>
    </div>
  );
};

export default HomePageMain;
