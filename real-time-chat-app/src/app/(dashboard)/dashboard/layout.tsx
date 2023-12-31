import FriendRequestSidebarOption from "@/components/FriendRequestSidebarOption";
import { Icon, Icons } from "@/components/Icons";
import SignOutButton from "@/components/SignOutButton";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarOption {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

// put the sidebar option separately here so that it's easier to expand and manage
const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: "/dashboard/add", // href here refers to the path after the domain name, i.e. localhost:3000
    Icon: "UserPlus",
  },
];

async function layout({ children }: LayoutProps) {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) notFound();

  const unseenRequestCount = (
    await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    ) as User[]
  ).length;

  console.log("Unseen Request Count:", unseenRequestCount)

  return (
    <div className="w-full flex h-screen">
      {/* flex-grow and flex-shrink determines whether the flex container grow or shrink when there's extra space */}
      <div className="flex h-full w-full max-w-xs grow-0 shrink-0 flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Icons.Logo className="h-8 w-auto text-indigo-600" />
        </Link>

        {/* leading-6 is the line height */}
        <div className="text-xs font-semibold leading-6 text-gray-400">
          Your chats
        </div>

        <nav className="flex flex-1 flex-col">
          {/* unordered list of navigation sidebar */}
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            {/* chat section */}
            <li>chats that this user has</li>

            {/* overview section */}
            <li>
              <div className="textxs font-semibold leading-6 text-gray-400">
                Overview
              </div>

              <ul role="list" className="mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => {
                  const Icon = Icons[option.Icon];
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-4 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-text-[0.625rem] font-medium bg-white">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <FriendRequestSidebarOption
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>

            {/* profile section */}
            <li className="-mx-6 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || ""}
                    alt="Your profile picture"
                  />
                </div>

                {/* sr-only means screen-reader only. It is to hide the element visually but not from screen reader users. */}
                {/* when aria-hidden is set to true, it hides an element and its content from accessibility technologies, often are non-essential content that doesn't provide meaningful information to disabilites. */}
                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span>{session.user.name}</span>
                  <span className="text-xs text-zinc-400">
                    {session.user.email}
                  </span>
                </div>
              </div>

              {/* aspect-square means aspect-ratio 1/1 */}
              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </div>

      {children}
    </div>
  );
}

export default layout;
