import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`) as string;

    console.log('idToAdd', idToAdd)

    if (!idToAdd) {
      return new Response("User not found", { status: 404 });
    }

    const session = await getServerSession(authOptions);
    // console.log(session);

    /* {
            user: {
                name: 'Jia Yi',
                email: 'jiayi031209@gmail.com',
                image: 'https://lh3.googleusercontent.com/a/ACg8ocIudN4rRCTNJBJEvpVOo2uRoEQdQGT2bzHmgAfPJ8UKLO8=s96-c',
                id: 'e449f341-a6cf-44e2-827c-e46e1f6a8235'
            }
        } 
    */
    // console.log(idToAdd) // e449f341-a6cf-44e2-827c-e46e1f6a8235
    // console.log(session!.user.id) // e449f341-a6cf-44e2-827c-e46e1f6a8235

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    

    if (idToAdd === session.user.id) {
      return new Response("You cannot add yourself as a friend", {
        status: 400,
      });
    }

    // check if the user is already a friend
    // using the helper function that we created in redis.ts, first parameter is the command, second parameter is the query to the database
    // in this line, we're checking if the user that's currently loggeed in  is a member of the set of incoming friend requests
    const isAlreadyAdded = await fetchRedis(
      "sismember",
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    );

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      session.user.id
    );

    if (isAlreadyAdded) {
      return new Response("You've already sent a request", {
        status: 400,
      });
    }

    else if (isAlreadyFriends) {
      return new Response("You've already added this user as a friend", {
        status: 400,
      });
    }
    
    else {
      // valid request, send friend request
      // add the user id to the set of incoming friend requests
      // the first parameter is the title, second parameter is the content (viewable in the redis database)
      db.sadd(`user:${idToAdd}:incoming_friend_requests`, session.user.id);

      return new Response("Friend request sent", { status: 200 });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 400 });
    }

    return new Response("Something went wrong", { status: 500 });
  }
}
