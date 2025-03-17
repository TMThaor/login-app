"use client";
import { useEffect } from "react";
import Image from "next/image";

const RegisterSuccess = ({ onClose }: { onClose: () => void }) => {
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
          src="/images/dialogs/successIcon.png"
          width={64}
          height={64}
          alt=""
        ></Image>
        <p className="text-[28px] font-semibold text-[#10B981]">
          ĐĂNG KÝ THÀNH CÔNG
        </p>
        <div className="flex flex-col items-center">
          <p>Để sử dụng dịch vụ thu hộ,</p>
          <p>bạn có muốn Ký kết hợp đồng điện tử ngay?</p>
        </div>
        <div className="flex gap-5">
          <button className="w-30 h-11 px-[18px] py-[12px] rounded-[4px] bg-[#E7EAEE]">
            Đăng nhập
          </button>
          <button className=" w-40 h-11 px-[18px] py-[12px] rounded-[4px] bg-[#19B88B] text-white">
            Ký kết hợp đồng
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
