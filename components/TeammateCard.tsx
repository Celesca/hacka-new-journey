import React from "react";
import Image from "next/image";

export interface Teammate {
  id: number;
  name: string;
  age: number;
  location: string;
  skills: string[];
  avatar: string;
  category: string;
}

export default function TeammateCard({
  teammate,
  style,
}: {
  teammate: Teammate;
  style?: string;
}) {
  return (
    <div
      className={
        "absolute w-full h-full bg-white rounded-2xl shadow-2xl p-6 flex flex-col justify-between transition-all " +
        style
      }
    >
      <div className="relative w-full h-2/3 rounded-xl overflow-hidden">
        <Image
          src={teammate.avatar}
          alt={teammate.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-2xl font-bold text-orange-600">
          {teammate.name}, {teammate.age}
        </h3>
        <p className="text-gray-600">📍 {teammate.location}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {teammate.skills.map((s) => (
            <span
              key={s}
              className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}