import Image from "next/image";
export default function OurCustomer() {
  return (
    <div className="flex w-full h-[234px] bg-[#F7F8F9] justify-center items-center">
      <div className="w-[1280px] flex flex-col gap-6 items-center">
        <h1 className="text-[#DCA245] text-[28px] font-medium">
          KHÁCH HÀNG TIÊU BIỂU
        </h1>
        <div className="ourCustomer flex gap-13 h-[50px] items-center">
          <div>
            <Image
              src="/images/customers/left.png"
              width={32}
              height={32}
              alt=""
            ></Image>
          </div>
          <Image
            src="/images/customers/tiktok.png"
            width={149}
            height={50}
            alt=""
            className="h-full object-contain"
          ></Image>
          <Image
            src="/images/customers/upos.png"
            width={131}
            height={45}
            alt=""
            className="h-full object-contain"
          ></Image>
          <Image
            src="/images/customers/shopee.png"
            width={152}
            height={70}
            alt=""
            className=" h-full object-contain"
          ></Image>
          <Image
            src="/images/customers/oppo.png"
            width={152}
            height={39}
            alt=""
            className="h-full  object-contain"
          ></Image>
          <Image
            src="/images/customers/tiki.png"
            width={111}
            height={45}
            alt=""
            className="h-full  object-contain"
          ></Image>
          <Image
            src="/images/customers/thegioididong.png"
            width={134}
            height={80}
            alt=""
            className="h-full object-contain"
          ></Image>
          <div>
            <Image
              src="/images/customers/right.png"
              width={32}
              height={32}
              alt=""
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
