import Image from "next/image";
function Banner() {
  return (
    <div className="flex relative justify-center items-end">
      <Image
        src="/images/banner/headerBackground.png"
        className=" "
        alt=""
        width={1440}
        height={600}
      />
      <Image
        className="absolute top-[-10] left-[-20]"
        src="/images/banner/logo nen toi 1.png"
        alt=""
        width={271}
        height={271}
      ></Image>
    </div>
  );
}

export default Banner;
