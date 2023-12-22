"use client";

import React, { useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequest: IncomingFriendRequest[];
  sessionId: string;
}

function FriendRequests({
  incomingFriendRequest,
  sessionId,
}: FriendRequestsProps) {
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequest
  );
  return <>
    {/* {friendRequests.length === 0 ? (
      
    ) : (

    )} */}
  </>
}

export default FriendRequests;
