import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

async function page() {
  const session = await getServerSession(authOptions);

  if (!session) notFound();

  // ids of people who sent current logged in user a friend request

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  console.log("Incoming Sender Ids:", incomingSenderIds)

  const incomingFriendRequests = await Promise.all( // Promise.all is used to wait for all promises to resolve
    incomingSenderIds.map(async (senderId) => {
        const sender = await fetchRedis('get', `user:${senderId}`) as User
        console.log(sender)
        return {
            senderId,
            senderEmail: sender.email,
        }
    })
  )

  console.log("Incoming Friend Requests:", incomingFriendRequests)
  return (
    <div className='pt-8'>
        <h1 className='font-bold text-5xl mb-8'>Friend requests</h1>
        <div className="flex flex-col gap-4">
            {/* <FriendRequests /> */}
        </div>
    </div>
  );
}

export default page;
