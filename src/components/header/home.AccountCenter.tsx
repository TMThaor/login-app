import { useUserInformation } from "@/app/context/context.userInformation";
import React from "react";
import Image from "next/image";

const AccountCenter = () => {
  const { userInformation } = useUserInformation();
  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-1">
        <p className="font-semibold text-white text-[18px]">Xin chào bạn</p>
        <p className="text-white">{userInformation?.content?.shopName}</p>
        <Image
          src="images/banner/avatar.png"
          width={102}
          height={107}
          alt=""
        ></Image>
        <button className="w-[82px] h-[43px] px-[18px] py-[12px] rounded-[4px] bg-[#FDBA4D] text-white">
          Thoát
        </button>
      </div>
    </div>
  );
};

export default AccountCenter;
