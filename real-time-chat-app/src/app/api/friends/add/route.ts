import { authOptions } from "@/lib/auth";
import { addFriendValidator } from "@/lib/validations/add-friend";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email: emailToAdd } = addFriendValidator.parse(body.email);

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


  } catch (error) {}
}
