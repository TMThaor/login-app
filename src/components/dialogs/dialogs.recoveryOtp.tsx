"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { useForgotPassword } from "@/app/context/context.forgotPassword";
import { getOtpChangePassword, validateOTP } from "@/app/services/userAccount";

const RecoveryOTP = () => {
  //Xử lý mở dialog
  const { setStep, username, otp, setOtp } = useForgotPassword();
  //Xử lý nhập dữ liệu otp
  const [error, setError] = useState(true);
  const [inputOtp, setInputOtp] = useState(new Array(6).fill(""));

  const handleEnterOTP = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...inputOtp];
    newOtp[index] = value;
    setInputOtp(newOtp);
    if (value && e.target.nextElementSibling) {
      (e.target.nextElementSibling as HTMLInputElement).focus();
    }
  };
  const handleDeleteOTP = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !inputOtp[index]) {
      const newOtp = [...inputOtp];
      if (index > 0) {
        newOtp[index - 1] = "";
        setInputOtp(newOtp);
        (e.currentTarget.previousElementSibling as HTMLInputElement)?.focus();
      }
    }
  };
  const handleSubmitOTP = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOtp(inputOtp.join("")); // Cập nhật state otp mới
    if (otp.length === 6) {
      const data = await validateOTP(username, otp);
      if (data?.content) {
        console.log("+++", otp);
        setStep(3);
      } else {
        setError(false);
      }
    }
  };

  const Ref = useRef<NodeJS.Timeout | null>(null);

  // State để lưu thời gian đếm ngược
  const [timer, setTimer] = useState<string>("00:00");

  // Hàm tính toán thời gian còn lại
  const getTimeRemaining = (endTime: Date) => {
    const total =
      Date.parse(endTime.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);

    return { total, minutes, seconds };
  };

  // Hàm bắt đầu đếm ngược
  const startTimer = (endTime: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(endTime);

    if (total >= 0) {
      setTimer(
        `${minutes > 9 ? minutes : "0" + minutes}:${
          seconds > 9 ? seconds : "0" + seconds
        }`
      );
    }
  };

  // Hàm đặt lại và bắt đầu lại bộ đếm thời gian
  const clearTimer = (endTime: Date) => {
    setTimer("03:00");

    if (Ref.current) clearInterval(Ref.current);

    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);

    Ref.current = id;
  };

  // Hàm lấy thời gian kết thúc đếm ngược
  const getDeadTime = (): Date => {
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 180);
    return deadline;
  };

  // useEffect để bắt đầu bộ đếm thời gian khi component mount
  useEffect(() => {
    clearTimer(getDeadTime());
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  // Hàm reset bộ đếm thời gian
  const onClickReset = async () => {
    await getOtpChangePassword(username);
    clearTimer(getDeadTime());
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40 z-50"
      onClick={() => {
        setOtp("");
        setStep(0);
      }}
    >
      <div
        className="w-140 h-95 border-solid border-black border-[1px] bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-18 bg-[#F7F8F9] items-center justify-between">
          <p className="ml-[18px] text-2xl font-bold">NHẬP MÃ OTP</p>
          <Image
            onClick={() => {
              setOtp("");
              setStep(0);
            }}
            src="images/dialogs/quit_icon.png"
            width={24}
            height={24}
            alt=""
            className=" mr-[18px] object-contain cursor-pointer"
          ></Image>
        </div>
        <form
          action=""
          onSubmit={handleSubmitOTP}
          className="p-6 flex flex-col  items-center gap-2"
        >
          {error && (
            <p className="font-bold text-xl text-[#10B981]">
              MÃ OTP ĐÃ ĐƯỢC GỬI TỚI SỐ ĐIỆN THOẠI/ EMAIL
            </p>
          )}
          {!error && (
            <div className="flex flex-row justify-center items-center text-[18px] w-[366px] h-[44px] bg-[#FFF2F2]">
              <p className="text-[#ECAD48]">Mã khôi phục không đúng. </p>
              <p
                className="text-[#0079ED] cursor-pointer"
                onClick={onClickReset}
              >
                Gửi lại mã
              </p>
            </div>
          )}
          <p className="text-[#ECAD48]">Thời gian còn lại: {timer}</p>
          <div className="otp flex justify-between gap-3">
            {inputOtp.map((data, i) => {
              return (
                <input
                  key={i}
                  type="text"
                  name=""
                  id=""
                  value={data}
                  maxLength={1}
                  onChange={(e) => handleEnterOTP(e, i)}
                  onKeyDown={(e) => handleDeleteOTP(e, i)}
                  className={`border-solid border-gray-300 border-[2px] w-[65px] h-[65px] text-center text-4xl ${
                    error ? "text-[#059669]" : "text-[#ECAD48]"
                  } font-bold rounded-[4px]`}
                />
              );
            })}
          </div>
          {error && (
            <div className="flex flex-row justify-center items-center text-[18px] w-[366px] ">
              <p className="">Không nhận được mã OTP. </p>
              <p
                className="text-[#0079ED] cursor-pointer"
                onClick={onClickReset}
              >
                Gửi lại mã
              </p>
            </div>
          )}
          <div className="flex justify-center mt-5 gap-5">
            <button
              className="w-[108px] h-[48px] bg-[#E7EAEE] text-black font-medium py-[12px] px-[18px] cursor-pointer"
              onClick={() => {
                setStep(1);
              }}
            >
              Trở về
            </button>
            <button className="text-white font-medium bg-[#FDBA4D] py-[12px] px-[18px] rounded-[4px] cursor-pointer">
              Thay đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoveryOTP;
