import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-4 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <Link href="/match" className="text-2xl text-gray-700 hover:text-orange-500">
          ← Back
        </Link>
        <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
          Chat with Alex
        </h1>
        <div className="w-8" /> {/* placeholder */}
      </header>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}