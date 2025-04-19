"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const menuItems = [
    { id: "news", icon: "📰", label: "News", href: "/news" },
    { id: "match", icon: "👥", label: "Match", href: "/match" },
    { id: "chat", icon: "💬", label: "Chat", href: "/chat" },
  ];

  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo with animation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image 
            src="/Hacka_logo.jpg"
            alt="Hacka Logo"
            width={40}
            height={40}
            className="inline-block mr-2 rounded-full"
          />
          <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-600">
            Hacka
          </Link>
        </motion.div>

        {/* Animated Menu Links */}
        <ul className="hidden md:flex items-center space-x-4">
          {menuItems.map((item, i) => (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
            >
              <Link 
                href={item.href}
                className="flex items-center space-x-1 text-gray-700 hover:text-orange-500 transition px-3 py-2"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Profile with animation */}
        <motion.div 
          className="flex items-center space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Link href="/profile" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-yellow-400">
              <Image
                src="/profile.jpg"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </div>
            <span className="hidden sm:block text-gray-700 hover:text-orange-500 transition">
              Profile
            </span>
          </Link>
          
          {/* Mobile menu toggle */}
          <button className="md:hidden text-gray-700 hover:text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </motion.div>
      </div>
    </nav>
  );
}