"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface Message {
  id: number;
  text: string;
  sender: "me" | "them";
  timestamp: Date;
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey, are you ready for the hackathon?", sender: "them", timestamp: new Date() },
    { id: 2, text: "Absolutely! What tech stack are you thinking?", sender: "me", timestamp: new Date() },
  ]);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const next: Message = {
      id: messages.length + 1,
      text: input.trim(),
      sender: "me",
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, next]);
    setInput("");
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-full max-w-lg w-full mx-auto bg-white/90 rounded-xl shadow-lg overflow-hidden">
      {/* Messages */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50"
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-end ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {/* avatar on left for “them” */}
            {msg.sender === "them" && (
              <div className="w-8 h-8 mr-2 shrink-0 rounded-full overflow-hidden">
                <Image
                  src="/chat/chat2.jpg"
                  alt="Them"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}

            {/* message bubble */}
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl whitespace-pre-wrap text-sm ${
                msg.sender === "me"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
                  : "bg-white shadow text-gray-800"
              }`}
            >
              {msg.text}
            </div>

            {/* optional avatar on right for “me” */}
            {msg.sender === "me" && (
              <div className="w-8 h-8 ml-2 shrink-0 rounded-full overflow-hidden">
                <Image
                  src="/chat/chat1.jpg"
                  alt="Me"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-3 bg-white border-t border-gray-200">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message…"
          className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-sm"
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full hover:scale-105 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}