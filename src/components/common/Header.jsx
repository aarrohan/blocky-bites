import React, { useState, useEffect } from "react";
import { MenuIcon, NavLogo } from "./Icons";
import Link from "next/link";
import { headerIcons } from "./Helper";
import MobileNav from "./MobileNav";
import { useGlobalInfoProvider } from "./CommonProvider";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import { readContract } from "@wagmi/core";
import { smartContract } from "@/config";

const Header = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount();
  const [cartData, setCartData] = useState(false);
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const {
    aboutRef,
    roadmapRef,
    homeRef,
    merchandiseRef,
    teamRef,
    theBlockRef,
  } = useGlobalInfoProvider();

  const menuHandler = () => {
    setMobileNavbar(true);
    setCartData(true);
    document.body.style.overflow = "hidden";
  };
  // ================= LINK DATA =================
  const headerLinks = [
    { link: "Home", id: "home" },
    { link: "About Us", id: "aboutUs" },
    { link: "Roadmap", id: "roadmap" },
    { link: "The Block", id: "block" },
    { link: "Merchandise", id: "merchandise" },
    { link: "Team", id: "team" },
  ];
  // ========= SCROLL TOP FOR LINKS =========
  const scrollToSection = (value) => {
    if (value.current) {
      value.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  // ========= SCROLL TOP FOR LOGO =========
  const scrollToHome = () => {
    if (homeRef.current) {
      homeRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isConnected) {
      setIsWalletConnected(true);

      // readContract({
      //   chainId: 5,
      //   address: smartContract.address,
      //   abi: smartContract.abi,
      //   functionName: "walletOfOwner",
      //   args: [address],
      // }).then((res) => {
      //   if (res.length < 1) {
      //     toast.error("You have to own a Blocky Bite NFT!");
      //   }
      // });
    } else {
      setIsWalletConnected(false);
    }
  }, [isConnected]);

  return (
    <>
      <div className="bg-[#FFFFFF08] py-2 backdrop-blur-[32px] z-20 fixed top-0 w-full">
        <MobileNav
          cartData={cartData}
          mobileNavbar={mobileNavbar}
          setMobileNavbar={setMobileNavbar}
        />
        <div className="container xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 lg:px-[40px] xl:px-0 flex justify-between items-center gap-5 xl:gap-20">
          <div className="w-full">
            <Link
              onClick={scrollToHome}
              href="/"
              className="w-fit cursor-pointer"
            >
              <NavLogo />
            </Link>
          </div>
          <div className="hidden lg:flex items-center gap-6 xl:gap-[35px] w-full">
            {headerLinks.map((obj, index) => (
              <Link
                href={`/#${obj.id}`}
                key={index}
                className={`text-xs xl:text-sm font-medium duration-300 uppercase hover:opacity-100 whitespace-nowrap cursor-pointer ${
                  obj.link === "Home" ? "" : "opacity-60"
                } `}
              >
                {obj.link}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-[14px] w-full">
            {headerIcons.map((obj, index) => (
              <a
                aria-label="social-links"
                className="duration-300 hover:translate-y-[-6px]"
                key={index}
                href={obj.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {obj.icon}
              </a>
            ))}
            {isWalletConnected ? (
              <>
                <Link
                  href={"/account"}
                  className="uppercase text-xs xl:text-sm font-bold text-black bg-[url('/assets/images/svg/button_bg.svg')] h-[50px] xl:h-[56px] w-[150px] xl:w-[164px] bg-no-repeat ms-3 xl:ms-5 duration-300 hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] flex justify-center items-center bg_size_full"
                >
                  Account
                </Link>

                <button
                  onClick={() => {
                    open();
                  }}
                  className="ml-2 uppercase text-xs xl:text-sm font-bold"
                >
                  Wallet
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  open();
                }}
                className="uppercase text-xs xl:text-sm font-bold text-black bg-[url('/assets/images/svg/button_bg.svg')] h-[50px] xl:h-[56px] w-[150px] xl:w-[164px] bg-no-repeat ms-3 xl:ms-5 duration-300 hover:bg-[url('/assets/images/png/button-border.png')] hover:text-[#FFBB00] flex justify-center items-center bg_size_full"
              >
                Connect Wallet
              </button>
            )}
          </div>
          <span className="lg:hidden cursor-pointer" onClick={menuHandler}>
            <MenuIcon />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;
