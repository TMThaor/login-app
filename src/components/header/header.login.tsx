"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";
import RecoveryPasswordRequest from "../dialogs/diaglogs.recoveryPasswordRequest";
import { loginRequest } from "@/app/services/userAccount";
import { useForgotPassword } from "@/app/context/context.forgotPassword";
import RecoveryOTP from "../dialogs/dialogs.recoveryOtp";
import ResetPassword from "../dialogs/dialogs.resetPassword";
import ChangePasswordSuccess from "../dialogs/dialogs.changePasswordSuccess";
import { useUserInformation } from "@/app/context/context.userInformation";

function LoginForm() {
  const { setUserInformation } = useUserInformation();
  const { step, setStep } = useForgotPassword(); // Sử dụng Context
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [visiblePassword, setVisiblePassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const newErrors = { username: "", password: "" };

    if (!formData.username) {
      newErrors.username = "Vui lòng nhập số điện thoại hoặc email.";
      isValid = false;
    } else if (
      !emailRegex.test(formData.username) &&
      !phoneRegex.test(formData.username)
    ) {
      newErrors.username = "Số điện thoại/Email không hợp lệ";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const res = await loginRequest(formData.username, formData.password);
      if (res?.success) {
        setUserInformation(res);
      } else {
        setErrors({ username: res?.error ?? "", password: "" });
      }
    }
  };
  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div>
      <div className="w-[748px] h-[199px]">
        <p className="text-white text-[18px] mb-[20px]">ĐĂNG NHẬP NGAY!</p>
        <form
          onSubmit={handleSubmit}
          className="flex gap-5 items-center p-[28px] border-[1px] border-solid border-[#333] bg-white rounded-[5px]"
        >
          <div className="username inline-flex flex-col">
            <label htmlFor="username" className="text-[#555] text-[14px]">
              Số điện thoại hoặc email
            </label>
            <input
              type="text"
              name="username"
              className="usernameInput w-[290px] h-[44px] border-solid border-[1px] border-[#a0abbb] pr-[12px] pl-[12px] rounded-[4px]"
              placeholder="Nhập số điện thoại hoặc email..."
              value={formData.username}
              onChange={handleInputChange}
            />
            <p className="text-red-500 text-sm h-4 w-[290px]">
              {errors.username}
            </p>
          </div>
          <div className="password">
            <label htmlFor="password" className="text-[#555] text-[14px]">
              Mật khẩu
            </label>

            <div className=" relative flex justify-between items-center ">
              <input
                type={visiblePassword.password ? "text" : "password"}
                className="passwordInput w-[250px] h-[44px] border-solid border-[1px] border-[#a0abbb] pr-[12px] pl-[12px] rounded-[4px] "
                placeholder="Nhập mật khẩu..."
              />
              <div
                className="absolute right-[10px]"
                onClick={() => togglePasswordVisibility("password")}
              >
                {visiblePassword.password ? (
                  <Image
                    className="cursor-pointer"
                    src="images/dialogs/eye-regular.png"
                    width={24}
                    height={24}
                    alt=""
                  ></Image>
                ) : (
                  <Image
                    className="cursor-pointer"
                    src="images/dialogs/eye-slat.png"
                    width={24}
                    height={24}
                    alt=""
                  ></Image>
                )}
              </div>
            </div>
            <p className="text-red-500 text-sm h-4 w-[250px]">
              {errors.password}
            </p>
          </div>
          <button
            className="bg-[#fdba4d] w-[120px] h-[43px] pr-[12px] pl-[12px] rounded-[4px] cursor-pointer"
            type="submit"
          >
            Đăng nhập
          </button>
        </form>

        {/* Khi bấm vào "Quên mật khẩu?", gọi setStep(1) để hiển thị RecoveryPasswordRequest */}
        <a
          onClick={() => setStep(1)}
          href="#quen"
          className="block justify-self-end text-white hover:underline"
        >
          Quên mật khẩu?
        </a>

        {step === 1 && <RecoveryPasswordRequest />}
        {step === 2 && <RecoveryOTP />}
        {step === 3 && <ResetPassword />}
        {step === 4 && <ChangePasswordSuccess></ChangePasswordSuccess>}
      </div>
    </div>
  );
}

export default LoginForm;
