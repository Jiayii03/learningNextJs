// helper function to make requests via RestApi endpoint, so that it's easy to change the endpoint

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${
    process.env.UPSTASH_REDIS_REST_URL
  }/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    },
    cache: "no-store", // prevent caching
  });

  if(!response.ok) {
    throw new Error("Error executing Redis command" + response.statusText)
  }

  const data = await response.json();

  return data.result;
}
