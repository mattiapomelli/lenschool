import { Menu } from "@headlessui/react";
import {
  useActiveProfile,
  useWalletLogin,
  useWalletLogout,
  useApolloClient,
} from "@lens-protocol/react-web";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAccount, useConnect, useDisconnect, useSwitchNetwork } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

import { getPictureURL } from "../../utils/ipfs-to-gateway-url";

export const LensLogin = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { data: activeProfile } = useActiveProfile();
  const { execute: login } = useWalletLogin();
  const { execute: logout } = useWalletLogout();
  const { isConnected } = useAccount();
  const { connectAsync } = useConnect({
    connector: new InjectedConnector(),
    onSuccess() {
      if (switchNetwork) {
        switchNetwork(
          process.env.NEXT_PUBLIC_CHAIN?.toLowerCase() != "testnet"
            ? 137
            : 80001,
        );
      }
    },
  });
  const { disconnectAsync } = useDisconnect();
  const { cache } = useApolloClient();

  const signIn = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { connector } = await connectAsync();

    if (connector instanceof InjectedConnector) {
      const signer = await connector.getSigner();
      await login(signer);
      await cache.reset();
    }
  };

  const signOut = async () => {
    await logout();
    await cache.reset();
  };

  return (
    <div>
      <div className="flex items-center">
        {activeProfile ? (
          <Menu as="div" className="relative text-xs text-lime-900">
            <Menu.Button className="flex cursor-pointer items-center space-x-1 rounded-md bg-lime-300 px-2 py-1">
              <Image
                src={getPictureURL(activeProfile)}
                alt={activeProfile.handle}
                width={25}
                height={25}
                className="mr-3 rounded-full"
              />
              {activeProfile.handle}
            </Menu.Button>
            <Menu.Items className="absolute z-50 mt-1 w-full space-y-1 rounded-md border bg-white p-0.5 text-sm text-gray-900">
              <Menu.Item>
                <Link
                  href={`/user/${activeProfile.handle.replace(".test", "")}`}
                  className="block w-full rounded-md p-1.5 hover:cursor-pointer hover:bg-lime-300 hover:text-lime-900"
                >
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item>
                <div
                  className="w-full rounded-md p-1.5 hover:cursor-pointer hover:bg-lime-300 hover:text-lime-900"
                  onClick={signOut}
                >
                  Disconnect
                </div>
              </Menu.Item>
            </Menu.Items>
          </Menu>
        ) : (
          <button
            className="flex cursor-pointer items-center space-x-1 rounded-md bg-lime-500 p-2 text-xs text-lime-50"
            onClick={signIn}
          >
            <svg
              width="25.5"
              height="16.5"
              viewBox="13 11.5 40 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M43.8382 14.2664C42.3476 14.1521 40.7931 14.6041 39.3999 15.792C39.2502 13.9603 38.4692 12.5348 37.3355 11.5547C36.1265 10.5097 34.551 10 32.9951 10C31.4393 10 29.8638 10.5097 28.6548 11.5547C27.5212 12.5346 26.7403 13.9599 26.5904 15.7913C25.1964 14.6039 23.6417 14.1525 22.151 14.2672C20.5606 14.3896 19.0891 15.152 17.9905 16.2588C16.8918 17.3657 16.1373 18.8459 16.0169 20.4429C15.8953 22.0547 16.4239 23.7425 17.8169 25.2228L17.8179 25.2239C17.9447 25.358 18.0734 25.4912 18.2041 25.6236L18.2055 25.625C24.5371 31.9998 32.9527 32 32.9952 32H32.9959C33.0924 31.9999 41.4747 31.9791 47.7857 25.6253C47.9183 25.4926 48.0481 25.3582 48.1752 25.2221C49.5677 23.7404 50.0959 22.0522 49.9739 20.4402C49.853 18.843 49.098 17.363 47.999 16.2564C46.9001 15.15 45.4285 14.3883 43.8382 14.2664ZM32.7063 31.3473C32.7062 31.35 32.7061 31.3527 32.706 31.3554C32.706 31.3527 32.7059 31.35 32.7058 31.3473L32.7063 31.3473Z"
                fill="#538320"
              ></path>
              <path
                d="M37.7393 22.5319C37.5649 22.5319 37.5051 22.7865 37.6163 22.9207C37.8117 23.1565 37.9293 23.4599 37.9293 23.791C37.9293 24.5417 37.3248 25.1503 36.5792 25.1503C35.8335 25.1503 35.2291 24.5417 35.2291 23.791C35.2291 23.7494 35.1751 23.7287 35.1508 23.7624C34.9391 24.0563 34.7963 24.3861 34.7377 24.7323C34.7047 24.9268 34.5477 25.0878 34.3504 25.0878H34.2391C33.9804 25.0878 33.7669 24.8766 33.8051 24.6207C34.0669 22.8669 35.7837 21.5948 37.7393 21.5948C39.6948 21.5948 41.4117 22.8669 41.6735 24.6207C41.7117 24.8766 41.4982 25.0878 41.2394 25.0878C40.9807 25.0878 40.7757 24.8756 40.7195 24.623C40.4635 23.4734 39.277 22.5319 37.7393 22.5319Z"
                fill="#F7FEE7"
              ></path>
              <path
                d="M25.7505 23.791C25.7505 23.7358 25.6794 23.706 25.6461 23.75C25.4202 24.0484 25.2664 24.386 25.2014 24.7418C25.1631 24.9512 24.9939 25.1252 24.781 25.1252H24.698C24.4392 25.1252 24.2257 24.914 24.2639 24.6581C24.5256 22.9033 26.2426 21.6322 28.1982 21.6322C30.1537 21.6322 31.8707 22.9033 32.1324 24.6581C32.1706 24.914 31.9571 25.1252 31.6983 25.1252C31.4395 25.1252 31.2346 24.913 31.1784 24.6604C30.9226 23.5101 29.7361 22.5693 28.1982 22.5693C28.056 22.5693 28.0045 22.7714 28.0998 22.8769C28.3178 23.1183 28.4507 23.439 28.4507 23.791C28.4507 24.5417 27.8462 25.1503 27.1006 25.1503C26.355 25.1503 25.7505 24.5417 25.7505 23.791Z"
                fill="#F7FEE7"
              ></path>
              <path
                d="M35.1897 26.921C34.9626 26.7969 34.68 26.8859 34.4971 27.069C34.1445 27.4218 33.6101 27.6629 32.9915 27.6629C32.3714 27.6629 31.8375 27.4243 31.4857 27.0712C31.3031 26.8878 31.0209 26.7977 30.7934 26.921C30.5659 27.0443 30.4786 27.3321 30.6417 27.533C31.1754 28.1907 32.0403 28.6 32.9915 28.6C33.9433 28.6 34.8063 28.1864 35.3393 27.5335C35.5029 27.3331 35.4168 27.045 35.1897 26.921Z"
                fill="#F7FEE7"
              ></path>
            </svg>
            <p>Sign in With Lens</p>
          </button>
        )}
      </div>
    </div>
  );
};
