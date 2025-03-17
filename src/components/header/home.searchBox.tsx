import React from "react";

const SearchBox = () => {
  return (
    <div>
      <div className="w-175 h-40">
        <p className="text-white">TÌM KIẾM NỘI DUNG</p>
        <div className="w-175 h-30 bg-white flex flex-col justify-center items-center rounded-md">
          <div>
            <p>Nhập thông tin cần tìm</p>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                className="w-140 h-11 border-[1px] border-solid border-[#A0ABBB] px-[18px] py-[12px] mt-[5px]"
                placeholder="Tên người dùng, số điện thoại hoặc email"
              />
              <button className="w-15 h-10 bg-[#FDBA4D] text-white rounded-sm">
                Tìm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
