"use client";
import { useState, useRef, useEffect } from "react";

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

  // auto–scroll on new message
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/80 rounded-lg shadow-inner"
      >
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`max-w-[80%] px-4 py-2 rounded-2xl whitespace-pre-wrap ${
              msg.sender === "me"
                ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Type a message…"
          className="flex-1 px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-full hover:scale-105 transition"
        >
          ➤
        </button>
      </div>
    </div>
  );
}