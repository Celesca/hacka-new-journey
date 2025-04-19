"use client";
import ChatList from "@/components/ChatList";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Inbox sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <ChatList />
      </div>

      {/* Chat window area */}
      <div className="flex-1 p-4 flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}