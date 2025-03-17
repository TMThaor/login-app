"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useForgotPassword } from "@/app/context/context.forgotPassword";

const ChangePasswordSuccess = () => {
  const [countdown, setCountdown] = useState(5); // Đếm ngược 5 giây
  const { setStep } = useForgotPassword();
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const closeTimeout = setTimeout(() => {
      setStep(0); // Đóng dialog sau 5 giây
    }, 5000);

    return () => {
      clearTimeout(closeTimeout);
      clearInterval(timer);
    };
  }, [setStep]);
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
      <div className=" flex flex-col gap-4 w-162 h-64 border-solid border-gray-300 border-[2px] bg-white items-center justify-center">
        <Image
          src="images/dialogs/successIcon.png"
          width={58}
          height={48}
          alt=""
        ></Image>
        <p className="text-[28px] font-semibold text-[#10B981]">
          MẬT KHẨU ĐÃ ĐƯỢC THIẾT LẬP LẠI
        </p>
        <p>Bạn vui lòng ghi nhớ mật khẩu nhé</p>
        <p>Tự động đăng nhập trong {countdown} giây</p>
      </div>
    </div>
  );
};

export default ChangePasswordSuccess;
