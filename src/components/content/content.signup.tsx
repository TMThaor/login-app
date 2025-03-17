"use client";
import Image from "next/image";
import { ChangeEventHandler, useState } from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/services/userAccount";
import RegisterFail from "../dialogs/dialogs.registerFail";
import RegisterSuccess from "../dialogs/dialogs.registerSuccess";

function SignUpForm() {
  const address: Address = {
    "Hà Nội": {
      "Ba Đình": [
        "Cống Vị",
        "Điện Biên",
        "Đội Cấn",
        "Giảng Võ",
        "Kim Mã",
        "Liễu Giai",
        "Ngọc Hà",
        "Ngọc Khánh",
        "Nguyễn Trung Trực",
        "Phúc Xã",
        "Quán Thánh",
        "Thành Công",
        "Trúc Bạch",
        "Vĩnh Phúc",
      ],
      "Hoàn Kiếm": ["Chương Dương", "Cửa Đông"],
      "Tây Hồ": ["Bưởi", "Nhật Tân"],
      "Cầu Giấy": ["Dịch Vọng", "Dịch Vọng Hậu"],
      "Đống Đa": ["Cát Linh", "Hàng Bột"],
    },
  };
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedWard, setSelectedWard] = useState<string>("");
  const [acceptTerm, setAcceptPolicy] = useState<boolean>(false);
  const [registerStatus, setRegisterStatus] = useState<boolean | null>(null);
  const [visiblePassword, setVisiblePassword] = useState<{
    password: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    confirmPassword: false,
  });

  const cities = Object.keys(address);

  // Cập nhật districts từ city đã chọn
  const districts = selectedCity ? Object.keys(address[selectedCity]) : [];

  // Cập nhật wards từ district đã chọn
  const wards =
    selectedCity && selectedDistrict
      ? address[selectedCity][selectedDistrict]
      : [];

  const schema: ZodType<SignUpForm> = z
    .object({
      shopName: z.string().min(1, "Vui lòng không bỏ trống"),
      phoneNumber: z
        .string()
        .min(1, "Vui lòng không bỏ trống")
        .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Số điện thoại không hợp lệ"),
      email: z
        .string()
        .min(1, "Vui lòng không bỏ trống")
        .email({ message: "Email không hợp lệ" }),
      password: z
        .string()
        .min(9, "Mật khẩu phải có ít nhất 9 ký tự")
        .regex(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/,
          "Mật khẩu phải có ít nhất 1 số, 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt (!@#$%^&*)"
        ),
      confirmPassword: z.string().min(1, "Vui lòng không bỏ trống"),
      address: z.string().min(1, "Vui lòng không bỏ trống"),
      province: z.string().min(1, "Vui lòng chọn"),
      district: z.string().min(1, "Vui lòng chọn"),
      wards: z.string().min(1, "Vui lòng chọn"),
      acceptTerm: z.boolean(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Mật khẩu không khớp",
          path: ["confirmPassword"],
        });
      }
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(schema),
  });
  const submitData = async (data: SignUpForm) => {
    const registerData = Object.assign({}, data, {
      userName: data.phoneNumber,
    });
    const res = await registerUser(registerData);
    if (res?.success) {
      setRegisterStatus(true);
    } else {
      setRegisterStatus(false);
    }
  };

  const handleOnChangeCheckbox: ChangeEventHandler<HTMLInputElement> = () => {
    setAcceptPolicy((prev) => !prev);
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setVisiblePassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="signUp w-[798px] h-[478px]">
      <h1 className="text-[#DCA245] text-[28px] text-center">
        ĐĂNG KÝ TÀI KHOẢN
      </h1>
      <form
        onSubmit={handleSubmit(submitData, (errors) => console.log(errors))}
        className="signUpForm grid grid-cols-6 gap-4"
      >
        <div className="inline-flex flex-col col-span-2">
          <label htmlFor="" className="text-[13px]">
            Tên cửa hàng
          </label>
          <input
            {...register("shopName")}
            type="text"
            className="storeName h-[44px] pr-[12px] pl-[12px]  border-[#A0ABBB] border-solid border-[1px] rounded-[4px]"
            placeholder="Nhập tên cửa hàng..."
          />
          {errors.shopName && (
            <p className="text-red-500 text-sm">{errors.shopName.message}</p>
          )}
        </div>
        <div className="inline-flex flex-col col-span-2">
          <label htmlFor="" className="text-[13px]">
            Số điện thoại
          </label>
          <input
            {...register("phoneNumber")}
            type="text"
            className="phoneNumber  h-[44px] pr-[12px] pl-[12px]  border-[#A0ABBB] border-solid border-[1px] rounded-[4px]"
            placeholder="Nhập số điện thoại..."
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
          )}
        </div>
        <div className="inline-flex flex-col col-span-2">
          <label htmlFor="" className="text-[13px]">
            Email
          </label>
          <input
            {...register("email")}
            type="text"
            className="email h-[44px] pr-[12px] pl-[12px]  border-[#A0ABBB] border-solid border-[1px] rounded-[4px]"
            placeholder="Nhập email..."
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="inline-flex flex-col col-span-3">
          <label htmlFor="" className="text-[13px]">
            Mật khẩu
          </label>
          <div className=" relative flex justify-between items-center ">
            <input
              {...register("password")}
              type={visiblePassword.password ? "text" : "password"}
              className="password w-[387px] h-[44px] pr-[12px] pl-[12px]  border-[#A0ABBB] border-solid border-[1px] rounded-[4px] "
              placeholder="Nhập mật khẩu..."
            />
            <div
              className="absolute right-[10px]"
              onClick={() => togglePasswordVisibility("password")}
            >
              {visiblePassword.password ? (
                <Image
                  src="/images/dialogs/eye-regular.png"
                  width={24}
                  height={24}
                  alt=""
                ></Image>
              ) : (
                <Image
                  src="/images/dialogs/eye-slat.png"
                  width={24}
                  height={24}
                  alt=""
                ></Image>
              )}
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="inline-flex flex-col col-span-3">
          <label htmlFor="" className="text-[13px]">
            Xác nhận mật khẩu
          </label>
          <div className=" relative flex justify-between items-center ">
            <input
              {...register("confirmPassword")}
              type={visiblePassword.confirmPassword ? "text" : "password"}
              className="confirmPassword w-[387px] h-[44px] pr-[12px] pl-[12px]  border-[#A0ABBB] border-solid border-[1px] rounded-[4px] "
              placeholder="Xác nhận mật khẩu..."
            />
            <div
              className="absolute right-[10px]"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {visiblePassword.confirmPassword ? (
                <Image
                  src="/images/dialogs/eye-regular.png"
                  width={24}
                  height={24}
                  alt=""
                ></Image>
              ) : (
                <Image
                  src="/images/dialogs/eye-slat.png"
                  width={24}
                  height={24}
                  alt=""
                ></Image>
              )}
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="inline-flex flex-col col-span-6">
          <label htmlFor="" className="text-[13px]">
            Địa chỉ
          </label>
          <input
            {...register("address")}
            type="text"
            className="address h-[44px] pr-[12px] pl-[12px]  border-[#A0ABBB] border-solid border-[1px] rounded-[4px]"
            placeholder="Nhập số nhà, tòa nhà, tên đường..."
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="inline-flex flex-col col-span-2">
          <label className="text-[13px]">Thành phố</label>
          <select
            {...register("province")}
            className="city h-[44px] pr-[12px] pl-[12px] border-[#A0ABBB] border-solid border-[1px] rounded-[4px]"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedDistrict("");
              setSelectedWard("");
            }}
          >
            <option value="" disabled hidden>
              Chọn Thành phố
            </option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.province && (
            <p className="text-red-500 text-sm">{errors.province.message}</p>
          )}
        </div>

        <div className="inline-flex flex-col col-span-2">
          <label className="text-[13px]">Quận/Huyện</label>
          <select
            {...register("district")}
            className="district h-[44px] pr-[12px] pl-[12px] border-[#A0ABBB] border-solid border-[1px] rounded-[4px]"
            value={selectedDistrict}
            onChange={(e) => {
              setSelectedDistrict(e.target.value);
              setSelectedWard("");
            }}
            disabled={!selectedCity}
          >
            <option value="" disabled hidden>
              Chọn Quận/Huyện
            </option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district.message}</p>
          )}
        </div>

        <div className="inline-flex flex-col col-span-2">
          <label className="text-[13px]">Phường/Xã</label>
          <select
            {...register("wards")}
            className="ward h-[44px] pr-[12px] pl-[12px] border-[#A0ABBB] border-solid border-[1px] rounded-[4px]"
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            disabled={!selectedDistrict}
          >
            <option value="" disabled hidden>
              Chọn Phường/Xã
            </option>
            {wards.map((ward) => (
              <option key={ward} value={ward}>
                {ward}
              </option>
            ))}
          </select>
          {errors.wards && (
            <p className="text-red-500 text-sm">{errors.wards.message}</p>
          )}
        </div>

        <div className="privacyPolicy inline-flex col-span-6 items-center">
          <input
            {...register("acceptTerm")}
            checked={acceptTerm}
            type="checkbox"
            className="checkboxPrivacy mr-[5px] "
            onChange={handleOnChangeCheckbox}
          />
          <p className="">
            <span>Tôi đã đọc và đồng ý với </span>
            <a href="#test" className="text-[#FDBA4D]">
              Chính sách bảo mật thông tin
            </a>
          </p>
          <button
            className={`submitBtn ml-auto h-[44px] pr-[12px] pl-[12px]
           border-[#A0ABBB] border-solid border-[1px] rounded-[4px] bg-[#FDBA4D]
           text-white ${acceptTerm ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            Đăng ký ngay
          </button>
        </div>
      </form>
      {registerStatus === true && (
        <RegisterSuccess onClose={() => setRegisterStatus(null)} />
      )}

      {registerStatus === false && (
        <RegisterFail onClose={() => setRegisterStatus(null)} />
      )}
    </div>
  );
}

export default SignUpForm;
