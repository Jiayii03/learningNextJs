import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

    // check if the user email exists (that wants to be added as a friend)
    const RESTResponse = await fetch(
      `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    const data = (await RESTResponse.json()) as { result: string };
    console.log(data);

    const idToAdd = data.result;

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

    if (!idToAdd) {
      return new Response("User not found", { status: 404 });
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

    if (isAlreadyAdded) {
      return new Response("You've already added this user as a friend", {
        status: 400,
      });
    }

    const isAlreadyFriends = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      session.user.id
    );

    if (isAlreadyFriends) {
      return new Response("You've already added this user as a friend", {
        status: 400,
      });
    }

    //
  } catch (error) {}
}
