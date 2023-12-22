import Image from "next/image";
import React, { useState } from "react";
import { merchandiseShop } from "./common/Helper";
import Link from "next/link";
import { useGlobalInfoProvider } from "./common/CommonProvider";
import { BlackLockIconBlack, ShopDropDownIcon } from "./common/Icons";
import { toast } from "react-toastify";
import { readContract } from "@wagmi/core";
import { smartContract } from "@/config";
import { useAccount } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const MerchandiseShop = () => {
  const { isConnected, address } = useAccount();
  const { open } = useWeb3Modal();
  const { merchandiseRef } = useGlobalInfoProvider();
  const [dropdownStates, setDropdownStates] = useState(
    Array(merchandiseShop.length).fill(false)
  );
  const [selectedSizes, setSelectedSizes] = useState(
    Array(merchandiseShop.length).fill("")
  );
  const [rotateArrow, setRotateArrow] = useState(
    Array(merchandiseShop.length).fill(false)
  );

  const toggleDropdown = (index) => {
    const newDropdownStates = [...dropdownStates];
    newDropdownStates[index] = !newDropdownStates[index];
    setDropdownStates(newDropdownStates);

    const newRotateArrows = [...rotateArrow];
    newRotateArrows[index] = !newRotateArrows[index];
    setRotateArrow(newRotateArrows);
  };

  const selectSize = (index, size) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = size;
    setSelectedSizes(newSelectedSizes);
    toggleDropdown(index);
  };
  const Data = [
    {
      selectValue: "lg",
    },
    {
      selectValue: "xl",
    },
    {
      selectValue: "xxl",
    },
  ];
  // ==========================================

  return (
    <div
      id="merchandise"
      ref={merchandiseRef}
      className="xl:pt-[150px] lg:pt-[130px] pt-[58px] relative"
    >
      <Image
        className="absolute top-[-50px] end-0 w-[30%] h-[1580px]"
        width="1700"
        height="980"
        src="/assets/images/svg/shop-wave.svg"
        alt="wave-img"
      />
      <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 relative z-10">
        <h3
          data-aos="fade-right"
          data-aos-easing="linear"
          data-aos-delay="300"
          className="font-extrabold text-[28px] leading-9 md:text-2xl md:leading-[65px] text-white text-center mb-0"
        >
          MERCHANDISE SHOP
        </h3>
        <div className="xl:mt-[35px] sm:mt-8 flex flex-wrap justify-center -mt-0.5">
          {merchandiseShop &&
            merchandiseShop.map((data, index) => {
              return (
                <div
                  data-aos="fade-down"
                  data-aos-easing="linear"
                  data-aos-delay={data.delay}
                  key={index}
                  className="lg:w-1/4 md:w-1/2 px-[7px] xl:px-2 mt-6 sm:mt-[15px]"
                >
                  <div className="hover_card_parent border border-solid border-[#FFBB001A] rounded-lg bg-[#18150E] p-3 xl:p-[15px] shop-card-shadow transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="overflow-hidden rounded-md">
                        {" "}
                        <Image
                          className="w-full h-full bg-white"
                          width="242"
                          height="237"
                          src={data.itemImg}
                          alt="add card items"
                        />
                      </div>
                      <div className="flex justify-between mt-[15px] mb-[5px]">
                        <p className="font-normal sm:text-[11.62px] xl:text-xs text-xs leading-[21px] opacity-70 text-white mb-0">
                          {data.newworld}
                        </p>
                        <p className="font-medium sm:text-[11.62px] xl:text-xs text-xs leading-[21px] opacity-70 text-white mb-0">
                          {data.bid}
                        </p>
                      </div>
                      <div className="flex justify-between lg:h-[62px]">
                        <p className="font-semibold text-[18px] xl:text-base lg:max-w-[150px] text-white mb-0 leading-[31px] duration-300 hover_card_text">
                          {data.nftArt}
                        </p>
                        <p className="font-medium sm:text-sm xl:text-base text-base leading-[26px] text-white mb-0 text-end">
                          {data.prize}
                        </p>
                      </div>
                    </div>
                    {index === 0 ? null : (
                      <div className="border border-[#D19A03] mt-2 py-2 px-3 cursor-pointer shop_dropdown relative">
                        <p
                          className="text-[#D19A03]"
                          onClick={() => toggleDropdown(index)}
                        >{`${
                          selectedSizes[index]
                            ? `${selectedSizes[index]}`
                            : "select size"
                        }`}</p>
                        {dropdownStates[index] ? (
                          <div className="absolute top-[100%] w-full start-0 border border-[#d19a03]">
                            {Data.map((value, i) => {
                              return (
                                <p
                                  key={i}
                                  className="mb-0 cursor-pointer bg-black text-[#D19A03] px-2 duration-300 hover:bg-[#D19A03] hover:text-black"
                                  onClick={() =>
                                    selectSize(index, value.selectValue)
                                  }
                                >
                                  {value.selectValue}
                                </p>
                              );
                            })}
                          </div>
                        ) : (
                          ""
                        )}
                        <span
                          onClick={() => toggleDropdown(index)}
                          className={`absolute right-[4%] duration-300 top-1/2 -translate-y-1/2 ${
                            rotateArrow[index] ? "rotate-180" : ""
                          }`}
                        >
                          <ShopDropDownIcon />
                        </span>
                      </div>
                    )}
                    <div className="flex justify-center mt-5 lg:mt-4 xl:mt-5 items-center w-full">
                      {index === 1 || index === 3 ? (
                        <button
                          onClick={() => {
                            if (isConnected) {
                              readContract({
                                chainId: 5,
                                address: smartContract.address,
                                abi: smartContract.abi,
                                functionName: "walletOfOwner",
                                args: [address],
                              }).then((res) => {
                                if (res.length < 1) {
                                  toast.error(
                                    "You have to own a Blocky Bite NFT!"
                                  );
                                }
                              });
                            } else {
                              toast.error("Connect your wallet");

                              open();
                            }
                          }}
                          className="uppercase text-xs lg:text-sm font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto"
                        >
                          Coming Soon! <BlackLockIconBlack group="group" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (isConnected) {
                              readContract({
                                chainId: 5,
                                address: smartContract.address,
                                abi: smartContract.abi,
                                functionName: "walletOfOwner",
                                args: [address],
                              }).then((res) => {
                                if (res.length < 1) {
                                  toast.error(
                                    "You have to own a Blocky Bite NFT!"
                                  );
                                }
                              });
                            } else {
                              toast.error("Connect your wallet");

                              open();
                            }
                          }}
                          className="uppercase text-xs lg:text-sm font-bold hover:text-black hover:bg-[url('/assets/images/png/filled-button-image.png')] bg-[url('/assets/images/png/button-border.png')] bg_size_full h-[56px] w-full bg-no-repeat duration-300 text-[#FFBB00] flex justify-center items-center gap-2 group mx-auto"
                        >
                          Coming Soon! <BlackLockIconBlack group="group" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        <div data-aos="fade-up" data-aos-easing="linear" data-aos-delay="300">
          <Link
            href="/"
            className="uppercase text-xs lg:text-sm font-bold text-black bg-[url('/assets/images/png/filled-button-image.png')] hover:bg-[url('/assets/images/png/button-border.png')] h-[56px] w-[250px] bg-no-repeat duration-300 hover:text-[#FFBB00] flex justify-center items-center  mt-8 xl:mt-10 mx-auto bg_size_full"
          >
            Full Shop Coming Soon!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MerchandiseShop;
