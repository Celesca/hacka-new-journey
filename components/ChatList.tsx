"use client";
import React from "react";
import Image from "next/image";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string;
  unread: number;
  updatedAt: string;
}

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    name: "Alex",
    lastMessage: "Sure, let’s use Next.js!",
    avatar: "/chat/chat2.jpg",
    unread: 2,
    updatedAt: "2m ago",
  },
  {
    id: 2,
    name: "Bella",
    lastMessage: "I’ll handle the backend.",
    avatar: "/chat/chat3.jpg",
    unread: 0,
    updatedAt: "1h ago",
  },
  {
    id: 3,
    name: "Chris",
    lastMessage: "Sent you the design mockups.",
    avatar: "/chat/chat4.jpg",
    unread: 5,
    updatedAt: "Yesterday",
  },
];

export default function ChatList() {
  return (
    <div className="w-64 bg-white/90 backdrop-blur-md border-r border-gray-200 overflow-y-auto">
      <h2 className="px-4 py-3 font-semibold text-gray-700">Inbox</h2>
      <ul className="space-y-1">
        {CONVERSATIONS.map((c) => (
          <li
            key={c.id}
            className="flex items-center px-4 py-2 hover:bg-yellow-50 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <Image
                src={c.avatar}
                alt={c.name}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{c.name}</span>
                <span className="text-xs text-gray-500">{c.updatedAt}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 truncate">{c.lastMessage}</p>
                {c.unread > 0 && (
                  <span className="ml-2 text-xs bg-orange-500 text-white rounded-full px-2">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}