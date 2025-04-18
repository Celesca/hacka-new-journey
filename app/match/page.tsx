"use client";
import React, { useState } from "react";
import TeammateCard, { Teammate } from "@/components/TeammateCard";

const DECK: Teammate[] = [
  {
    id: 1,
    name: "Alex",
    age: 25,
    location: "NYC",
    skills: ["React", "GraphQL"],
    avatar: "/avatars/alex.jpg",
    category: "Frontend",
  },
  {
    id: 2,
    name: "Bella",
    age: 29,
    location: "LA",
    skills: ["Node.js", "Express"],
    avatar: "/avatars/bella.jpg",
    category: "Backend",
  },
  {
    id: 3,
    name: "Chris",
    age: 22,
    location: "Toronto",
    skills: ["UI/UX", "Figma"],
    avatar: "/avatars/chris.jpg",
    category: "Design",
  },
  // ...more teammates
];

export default function MatchPage() {
  const [index, setIndex] = useState(0);
  const [filter, setFilter] = useState("All");

  const filtered = DECK.filter(
    (t) => filter === "All" || t.category === filter
  );
  const current = filtered[index % filtered.length];

  const swipe = (dir: "like" | "dislike") => {
    console.log(dir, current.name);
    setIndex((i) => i + 1);
  };

  const categories = ["All", ...new Set(DECK.map((t) => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-6 flex flex-col items-center animate-fadeIn">
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 mb-4">
        Find Your Teammate
      </h1>

      <select
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setIndex(0);
        }}
        className="mb-6 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-300"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <div className="relative w-full max-w-md h-96">
        {filtered.slice(index, index + 3).map((t, i) => (
          <TeammateCard
            key={t.id}
            teammate={t}
            style={`top-${i * 2} left-${i * 2} z-${10 - i}`}
          />
        ))}
      </div>

      <div className="flex gap-8 mt-8">
        <button
          onClick={() => swipe("dislike")}
          className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition"
        >
          ✗
        </button>
        <button
          onClick={() => swipe("like")}
          className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-2xl hover:scale-110 transition"
        >
          ✓
        </button>
      </div>
    </div>
  );
}