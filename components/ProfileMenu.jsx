"use client";

import { Menu, Transition } from "@headlessui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";

const ProfileMenu = ({ session }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flexCenter z-10 flex-col relative">
      <Menu as="div">
        <Menu.Button
          className="flexCenter"
          onMouseEnter={() => setIsModalOpen(true)}
        >
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="user profile image"
            />
          )}
        </Menu.Button>
        <Transition
          show={isModalOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            static
            className="flexStart profile_menu-items"
            onMouseLeave={() => setIsModalOpen(false)}
          >
            <div className="flex flex-col items-center gap-y-4">
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  width={80}
                  height={80}
                  className="rounded-full"
                  alt="user profile image"
                />
              )}
              <p className="font-semibold">{session?.user?.name}</p>
            </div>
            <div className="flex flex-col w-full items-start gap-3 pt-10">
              <Menu.Item>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-sm"
                >
                  Profile
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-sm"
                >
                  Preferences
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="text-sm"
                >
                  Setting
                </Link>
              </Menu.Item>
            </div>
            <div className="flexStart w-full border-t border-nav-border mt-5 pt-5">
              <Menu.Item>
                <button
                  type="button"
                  className="text-sm"
                  onClick={() => signOut()}
                >
                  Sign out
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
