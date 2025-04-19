"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Sample hackathon data
const hackathons = [
  {
    id: 1,
    title: "International Artificial Intelligence Hackathon 2025",
    img: "/news/hackathon1.png",
    date: "Jul 1 – Jul 31, 2025",
    registration: "Registration open until June 15, 2025",
    location: "Virtual + San Francisco, CA",
    prize: "$50,000",
    tags: ["AI", "Machine Learning", "Data Science"],
    description: "Join the world's largest AI hackathon and build solutions that address real-world challenges using artificial intelligence.",
  },
  {
    id: 2,
    title: "CAI Club Hackathon 2025",
    img: "/news/hackathon2.png",
    date: "Aug 5 – Aug 25, 2025",
    registration: "Registration open until July 20, 2025",
    location: "Bangkok, Thailand",
    prize: "฿300,000",
    tags: ["Web3", "Blockchain", "AI"],
    description: "Thailand's premier hackathon focused on integrating AI with blockchain technologies.",
  },
  {
    id: 3,
    title: "Super AI Engineer Season 5",
    img: "/news/hackathon3.jpg",
    date: "Sep 10 – Sep 30, 2025",
    registration: "Registration open until August 31, 2025",
    location: "Virtual",
    prize: "$25,000",
    tags: ["Computer Vision", "NLP", "Reinforcement Learning"],
    description: "A competition to find the best AI engineers through a series of challenges and projects.",
  },
  {
    id: 4,
    title: "Climate Tech Hackathon",
    img: "/news/hackathon4.jpg",
    date: "Oct 15 – Oct 20, 2025",
    registration: "Registration open until September 30, 2025",
    location: "London, UK",
    prize: "£30,000",
    tags: ["Climate Tech", "Sustainability", "IoT"],
    description: "Build innovative solutions to combat climate change and promote sustainability.",
  },
];

// Filter options
const filterOptions = [
  { value: "all", label: "All Events" },
  { value: "upcoming", label: "Upcoming" },
  { value: "virtual", label: "Virtual" },
  { value: "in-person", label: "In-Person" },
];

export default function NewsPage() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered hackathons
  const filteredHackathons = hackathons.filter(h => {
    if (searchQuery && !h.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (filter === "virtual" && !h.location.toLowerCase().includes("virtual")) {
      return false;
    }
    
    if (filter === "in-person" && h.location.toLowerCase().includes("virtual")) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 px-4 py-16 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
            Upcoming Hackathons
          </h1>
          <p className="mt-2 text-gray-600 text-lg">
            Find the perfect hackathon for your next challenge
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center space-x-2">
            <label className="text-gray-700">Filter:</label>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            >
              {filterOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search hackathons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-300 focus:outline-none"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">
              🔍
            </span>
          </div>
        </motion.div>

        {/* Hackathon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <Link href={`/news/${hackathon.id}`}>
                <div className="relative h-48 w-full">
                  <Image 
                    src={hackathon.img} 
                    alt={hackathon.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="font-bold text-lg">{hackathon.title}</h3>
                      <p className="text-sm opacity-90">{hackathon.date}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600 text-sm mr-2">📍</span>
                    <span className="text-gray-600 text-sm">{hackathon.location}</span>
                  </div>
                  <div className="flex items-center mb-3">
                    <span className="text-gray-600 text-sm mr-2">🏆</span>
                    <span className="text-gray-600 text-sm">Prize: {hackathon.prize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {hackathon.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 text-right">
                    <span className="text-orange-500 text-sm font-medium hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}