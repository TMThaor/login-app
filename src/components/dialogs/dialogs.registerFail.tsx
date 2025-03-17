"use client";
import { useEffect } from "react";
import Image from "next/image";

const RegisterFail = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const closeTimeOut = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(closeTimeOut);
  }, [onClose]);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className=" flex flex-col gap-4 w-140 h-82 border-solid border-gray-300 border-[2px] bg-white items-center justify-center">
        <Image
          src="images/dialogs/failIcon.png"
          width={64}
          height={64}
          alt=""
        ></Image>
        <p className="text-[28px] font-semibold text-[#DC2626]">
          ĐĂNG KÝ KHÔNG THÀNH CÔNG
        </p>
        <div className="flex flex-col items-center w-[331px] h-[44px] font-medium- text-[18px]">
          <p className="text-center">
            Thông tin đăng ký có thể đã trùng với một tài khoản khác trong hệ
            thống
          </p>
        </div>
        <div className="flex gap-5">
          <button className="w-42 h-11 px-[18px] py-[12px] rounded-[4px] bg-[#E7EAEE]">
            Bỏ qua đăng ký
          </button>
          <button className=" w-22 h-11 px-[18px] py-[12px] rounded-[4px] bg-[#19B88B] text-white">
            Thử lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterFail;
