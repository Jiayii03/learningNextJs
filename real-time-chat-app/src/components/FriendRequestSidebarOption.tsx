"use client";

import { User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface FriendRequestSidebarOptionProps {
  sessionId: string;
  initialUnseenRequestCount: number;
}

function FriendRequestSidebarOption({
  initialUnseenRequestCount,
  sessionId,
}: FriendRequestSidebarOptionProps) {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );
  return (
    // the group class is used so that when some events are triggered to the Link, all children can listen to it
    // line-height sets the distances between lines of text
    <Link
      href="/dashboard/requests"
      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-4 rounded-md p-2 text-sm leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-text-[0.625rem] bg-white font-medium">
        <User className="h-4 w-4" />
      </div>
      <p className="truncate">Friend requests</p>

      {unseenRequestCount > 0 ? (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600">
          {unseenRequestCount}
        </div>
      ) : null}
    </Link>
  );
}

export default FriendRequestSidebarOption;
