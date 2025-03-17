import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import { useForgotPassword } from "@/app/context/context.forgotPassword";
import { getOtpChangePassword } from "@/app/services/userAccount";

const RecoveryPasswordRequest: React.FC = () => {
  const { step, setStep, username, setUsername } = useForgotPassword();
  const [errors, setErrors] = useState({ username: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
    setErrors({ username: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const newErrors = { username: "" };

    if (!username) {
      newErrors.username = "Vui lòng nhập số điện thoại hoặc email";
      isValid = false;
    } else if (!emailRegex.test(username) && !phoneRegex.test(username)) {
      newErrors.username = "Số điện thoại/Email không hợp lệ";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const data = await getOtpChangePassword(username);
      if (data?.content) {
        setStep(2); // Chuyển sang bước nhập OTP
      } else {
        const newError = { username: "" };
        newError.username = data?.error ?? "";
        setErrors(newError);
      }
    }
  };

  if (step !== 1) return null; // Chỉ hiển thị dialog khi step = 1

  return (
    <div
      className="border-solid border-black border-[1px] fixed flex-col inset-0 flex items-center justify-center bg-black/40 z-50"
      onClick={() => setStep(0)}
    >
      <div className="bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex h-18 bg-[#F7F8F9] items-center justify-between">
          <p className="ml-[18px]">YÊU CẦU THAY ĐỔI MẬT KHẨU</p>
          <Image
            onClick={() => setStep(0)}
            src="/images/dialogs/quit_icon.png"
            width={24}
            height={24}
            alt=""
            className="mr-[18px] object-contain cursor-pointer"
          />
        </div>
        <form
          className="p-6 flex flex-col justify-between"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label>Email/ Số điện thoại</label>
            <input
              onChange={handleInputChange}
              type="text"
              placeholder="Nhập email hoặc số điện thoại..."
              className="border-solid border-[#A0ABBB] border-[1px] h-11 pl-3 pr-3 rounded-[4px]"
            />
            <p className="text-red-500 text-sm h-4 w-[250px]">
              {errors.username}
            </p>
            <p className="self-center mt-5">
              Bạn vui lòng kiểm tra hòm thư đến hoặc mục tin nhắn <br />
            </p>
            <p className="self-center">trên điện thoại để lấy mã OTP</p>
          </div>
          <button className="text-white bg-[#FDBA4D] pt-[12px] pb-[12px] pr-[18px] pl-[18px] rounded-[4px] self-center mt-5">
            Gửi yêu cầu
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecoveryPasswordRequest;
