"use client";

import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";
import axios from "axios";
import { Check, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionId: string;
}

const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,
  sessionId,
}) => {
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );
//   console.log(friendRequests);


  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`))

    const friendRequestHandler = ({senderId, senderEmail}: IncomingFriendRequest) => {
      setFriendRequests((prev) => [...prev, { senderId, senderEmail  }]);
    }

    pusherClient.bind('incoming_friend_requests', friendRequestHandler)

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionId}:incoming_friend_requests`))
      pusherClient.unbind('incoming_friend_requests', friendRequestHandler)
    }
  }, [])

  const router = useRouter()

  const acceptFriend = async (senderId: string) => {
    await axios.post('/api/friends/accept', {id: senderId })
    setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));

    router.refresh()
  }
  const denyFriend = async (senderId: string) => {
    await axios.post('/api/friends/deny', {id: senderId })
    setFriendRequests((prev) => prev.filter((request) => request.senderId !== senderId));

    router.refresh()
  }



  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">No new Friend requests...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex items-center gap-4" >
            <UserPlus className="text-black" />
            <p className="text-md text-lg">{request.senderEmail}</p>
            <button
              aira-label="accept friend"
              className="w-8 h-8 bg-indigo-600 hover:bg-indigo-700 grid place-items-center rounded-full transition hover:shadow-md"
              onClick={() => acceptFriend(request.senderId)}
            >
              <Check className="font-semibold text-white w-3/4 h-3/4" />
            </button>
            <button
              aira-label="deny friend"
              className="w-8 h-8 bg-red-600 hover:bg-red-700 grid place-items-center rounded-full transition hover:shadow-md"
              onClick={() => denyFriend(request.senderId)}
            >
              <X className="font-semibold text-white w-3/4 h-3/4" />
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default FriendRequests;
