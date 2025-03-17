import { useForgotPassword } from "@/app/context/context.forgotPassword";
import { changePassword } from "@/app/services/userAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";

export default function ResetPassword() {
  const { setStep, otp, username } = useForgotPassword();
  const schema: ZodType<ResetPasswordForm> = z
    .object({
      password: z
        .string()
        .regex(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{9,}$/,
          "Tối thiểu 9 ký tự có ít nhất 1 số, 1 chữ hoa, 1 chữ thường, 1 ký tự đặc biệt"
        ),
      confirmPassword: z.string().min(1, "Vui lòng không bỏ trống"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu không khớp",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({ resolver: zodResolver(schema) });

  const onsubmit = async (data: ResetPasswordForm) => {
    const res = await changePassword(
      username,
      otp,
      data.password,
      data.password
    );
    if (res?.success) {
      setStep(4);
    }
  };
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black/40 z-50"
      onClick={() => setStep(0)}
    >
      <div
        className="w-140 h-85 border-solid border-black border-[1px] bg-[#F7F8F9]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-18  items-center justify-between">
          <p className="ml-[18px]">THIẾT LẬP MẬT KHẨU MỚI</p>
          <Image
            onClick={() => {
              setStep(0);
            }}
            src="/images/dialogs/quit_icon.png"
            width={24}
            height={24}
            alt=""
            className=" mr-[18px] object-contain"
          ></Image>
        </div>
        <form
          onSubmit={handleSubmit(onsubmit)}
          action=""
          className="px-6 flex flex-col gap-3"
        >
          <div className="flex flex-col">
            <label htmlFor="">Mật khẩu mới</label>
            <input
              {...register("password")}
              type="password"
              placeholder="Nhập mật khẩu..."
              className="password border-solid border-[#A0ABBB] border-[1px] h-11 pl-3 pr-3 rounded-[4px]"
            />
            <div className="h-4">
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Xác nhận mật khẩu mới</label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Nhập mật khẩu..."
              className="confirmPassword border-solid border-[#A0ABBB] border-[1px] h-11 pl-3 pr-3 rounded-[4px]"
            />
            <div className="h-4">
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button className="text-white bg-[#FDBA4D] pt-[12px] pb-[12px] pr-[18px] pl-[18px] rounded-[4px] self-center">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
}
