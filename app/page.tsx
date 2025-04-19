"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "International Artificial Intelligence Hackathon 2025",
    img: "/news/hackathon1.png",
    link: "/news/",
    date: "Registration: Jul 1 – Jul 31, 2025",
  },
  {
    id: 2,
    title: "CAI Club Hackathon 2025",
    img: "/news/hackathon2.png",
    link: "/news/",
    date: "Registration: Aug 5 – Aug 25, 2025",
  },
  {
    id: 3,
    title: "Super AI Engineer Season 5",
    img: "/news/hackathon3.jpg",
    link: "/news/",
    date: "Registration: Sep 10 – Sep 30, 2025",
  },
];

const chatPreviews = [
  { id: 1, name: "Alex", avatar: "/chat/chat2.jpg", unread: 3 },
  { id: 2, name: "Bella", avatar: "/chat/chat3.jpg", unread: 0 },
  { id: 3, name: "Chris", avatar: "/chat/chat4.jpg", unread: 1 },
];

const menuItems = [
  { id: "match", icon: "👥", label: "Find Teams", href: "/match" },
  { id: "chat", icon: "💬", label: "Chat", href: "/chat" },
  { id: "news", icon: "📰", label: "Hackathons", href: "/news" },
];

export default function Home() {
  const [activeNews, setActiveNews] = useState(0);

  // Auto-rotate news items
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNews(current => (current + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8 space-y-16">
      {/* Animated Menu Icons */}
      <motion.div 
        className="fixed bottom-8 left-0 right-0 z-50 flex justify-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="flex bg-white/70 backdrop-blur-md p-3 rounded-full shadow-lg space-x-4">
          {menuItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1, type: "spring" }}
            >
              <Link 
                href={item.href}
                className="w-14 h-14 flex flex-col items-center justify-center rounded-full bg-gradient-to-tr from-orange-400 to-yellow-400 text-white hover:scale-110 transition"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-xs mt-1">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Hero with animated text */}
      <div className="text-center space-y-4">
        <motion.h1 
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Hacka
        </motion.h1>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Connect with teammates, explore news, and join the next big hackathon!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <Link
            href="/match"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg hover:scale-105 transition"
          >
            Find Teammates
          </Link>
        </motion.div>
      </div>

      {/* News Carousel with 3D effect */}
      <section>
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Latest News
        </motion.h2>
        
        <div className="relative h-96 max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {newsItems.map((item, idx) => (
              idx === activeNews && (
                <motion.div
                  key={item.id}
                  className="absolute inset-0"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                >
                  <div className="relative w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden transform-gpu">
                    <div className="relative h-2/3 w-full">
                      <Image
                        src={item.img}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-1">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.date}</p>
                      <Link 
                        href={item.link}
                        className="inline-block mt-2 text-sm text-orange-500 hover:underline"
                      >
                        Learn more →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
          
          {/* News navigation dots */}
          <div className="absolute -bottom-8 left-0 right-0 flex justify-center space-x-2">
            {newsItems.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveNews(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === activeNews ? "bg-orange-500 scale-125" : "bg-orange-200"
                }`}
                aria-label={`Show news item ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chat Preview with staggered animations */}
      <section>
        <motion.h2 
          className="text-3xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Recent Chats
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatPreviews.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={`/chat/`}
                className="flex items-center bg-white rounded-xl p-4 shadow hover:shadow-lg transition"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={c.avatar}
                    alt={c.name}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                  {c.unread > 0 && (
                    <motion.span 
                      className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + i * 0.1, type: "spring" }}
                    >
                      {c.unread}
                    </motion.span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{c.name}</p>
                  <p className="text-sm text-gray-500">
                    {c.unread > 0
                      ? `${c.unread} unread message${c.unread > 1 ? "s" : ""}`
                      : "No new messages"}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Advertisement with pulse effect */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div 
          className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white"
          whileHover={{ scale: 1.02 }}
          animate={{ boxShadow: ["0px 0px 0px rgba(0,0,0,0.2)", "0px 0px 20px rgba(255,165,0,0.3)", "0px 0px 0px rgba(0,0,0,0.2)"] }}
          transition={{ boxShadow: { repeat: Infinity, duration: 2 } }}
        >
          <div className="space-y-2 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Want to promote events?</h2>
            <p className="max-w-md">
              Get premium features: priority matching, exclusive events, and more!
            </p>
          </div>
          <Link
            href="/upgrade"
            className="px-6 py-3 border-2 border-white rounded-lg hover:bg-white hover:text-orange-500 transition"
          >
            Learn More
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
}