import AddFriendButton from "@/components/AddFriendButton";
import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helpers/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

const page: FC = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    notFound();
  }

  const incomingSenderIds = (await fetchRedis(
    "smembers",
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[]

//   console.log(incomingSenderIds)
  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
        const sender = JSON.parse(await fetchRedis('get', `user:${senderId}`)) as User
        // console.log(JSON.parse(sender).email)
        return {
            senderId,
            senderEmail: sender.email
        }
    }))
    // console.log(incomingFriendRequests)

    return <main className="pt-8">
        <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
        <div className="flex flex-col gap-4">
            <FriendRequests incomingFriendRequests={incomingFriendRequests} sessionId={session.user.id}/>
        </div>
    </main>;
};

export default page;
