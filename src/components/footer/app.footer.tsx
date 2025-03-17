import Image from "next/image";
export default function Footer() {
  return (
    <div className="footer flex w-full h-[305px] bg-[#D29B42] p-4 justify-between items-center">
      <div className="infor w-[482px] h-[209px]">
        <Image
          src="/images/footer/logo.png"
          width={159}
          height={53}
          alt=""
          className="object-contain"
        ></Image>
        <p className="font-semibold text-[#FFFFFF] mt-[10px]">
          CÔNG TY CỔ PHẦN ĐẦU TƯ VÀ PHÁT TRIỂN
          <br />
          ỨNG DỤNG THÔNG MINH VIỆT
        </p>
        <p className="font-normal text-[#ffffff] text-[13px]">
          Mã số thuế: 0106494214
          <br />
          Ngày hoạt động: 27/03/2014
          <br />
          Sở Kế Hoạch và Đầu Tư Thành Phố Hà Nội
        </p>
        <div className="social flex w-[214px] justify-between gap-4 mt-[16px]">
          <a href="#FB">
            <Image
              src="/images/footer/fb.png"
              width={30}
              height={30}
              alt=""
              className="w-[30px] h-[30px]"
            ></Image>
          </a>
          <a href="#IG">
            <Image
              src="/images/footer/Instagram.png"
              width={30}
              height={30}
              alt=""
              className="w-[30px] h-[30px] object-fill"
            ></Image>
          </a>
          <a href="#TIKTOK">
            <Image
              src="/images/footer/tiktok.png"
              width={30}
              height={30}
              alt=""
              className="w-[30px] h-[30px]"
            ></Image>
          </a>
          <a href="#YOUTUBE">
            <Image
              src="/images/footer/YT.png"
              width={30}
              height={30}
              alt=""
              className="w-[30px] h-[30px]"
            ></Image>
          </a>
          <a href="#ZALO">
            <Image
              src="/images/footer/zalo.png"
              width={30}
              height={30}
              alt=""
              className="w-[30px] h-[30px]"
            ></Image>
          </a>
        </div>
      </div>

      <div className="contact flex flex-col contact w-[375px] h-[154px] justify-between">
        <p className="text-white">LIÊN HỆ</p>
        <div className="flex">
          <Image
            src="/images/footer/mail.png"
            width={16}
            height={16}
            alt=""
          ></Image>
          <p className="text-[13px] text-white">contact@viajsc.com</p>
        </div>
        <div className="flex">
          <Image
            src="/images/footer/phone.png"
            width={16}
            height={16}
            alt=""
          ></Image>
          <p className="text-[13px] text-white">1900 9999</p>
        </div>
        <div className="flex">
          <Image
            src="/images/footer/location.png"
            width={16}
            height={16}
            alt=""
          ></Image>
          <p className="text-[13px] text-white">
            16, Ngõ 204, Trần Duy Hưng, Trung Hòa, Cầu Giấy, HN
          </p>
        </div>
        <div>
          <Image
            src="/images/footer/icon-bct 1.png"
            width={91}
            height={34}
            alt=""
          ></Image>
        </div>
      </div>
      <div className="download w-[210px] h-[123px]">
        <p className="font-semibold text-[#ffffff]">TẢI ỨNG DỤNG</p>
        <div className="grid grid-flow-col grid-row-3">
          <Image
            src="/images/footer/QR.png"
            width={80}
            height={80}
            alt=""
            className="row-span-3"
          ></Image>
          <Image
            src="/images/footer/App Store.png"
            width={110}
            height={32}
            alt=""
            className="col-span-2"
          ></Image>
          <Image
            src="/images/footer/googlePlay.png"
            width={110}
            height={32}
            alt=""
            className="col-span-2 row-span-2"
          ></Image>
        </div>
      </div>
    </div>
  );
}
