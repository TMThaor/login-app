import Image from "next/image";

export default function OurServices() {
  return (
    <div className="ourServices w-[352px] h-[445px] bg-[#F7F8F9] grid grid-cols-2 gap-6 pr-[24px] pl-[24px] pb-[24px]">
      <h1 className="font-bold text-[18px] col-span-2 justify-self-center self-center">
        DỊCH VỤ CỦA CHÚNG TÔI
      </h1>
      <div className="viaExpress flex flex-col items-center justify-center col-span-1 bg-white h-[99px]">
        <Image
          src="images/ourServices/via_express.png"
          width={40}
          height={40}
          alt=""
        ></Image>
        <p className="font-medium">VIA EXPRESS</p>
      </div>
      <div className="viaFast flex flex-col items-center justify-center col-span-1 bg-white h-[99px]">
        <Image
          src="images/ourServices/via_fast.png"
          width={40}
          height={40}
          alt=""
        ></Image>
        <p className="font-medium">VIA FAST</p>
      </div>
      <div className="viaSuper flex flex-col items-center justify-center col-span-1 bg-white h-[99px]">
        <Image
          src="images/ourServices/via_super.png"
          width={40}
          height={40}
          alt=""
        ></Image>
        <p className="font-medium">VIA SUPER</p>
      </div>
      <div className="viaFresh flex flex-col items-center justify-center col-span-1 bg-white h-[99px]">
        <Image
          src="images/ourServices/via_fresh.png"
          width={40}
          height={40}
          alt=""
        ></Image>
        <p className="font-medium">VIA FRESH</p>
      </div>
      <div className="viaInternational flex flex-col items-center justify-center col-span-2 bg-white h-[99px]">
        <Image
          src="images/ourServices/via_international.png"
          width={40}
          height={40}
          alt=""
        ></Image>
        <p className="font-medium">VIA International</p>
      </div>
    </div>
  );
}
