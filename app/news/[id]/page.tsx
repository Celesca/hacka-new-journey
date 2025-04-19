"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Define our types
interface TimelineItem {
  phase: string;
  date: string;
}

interface Organizer {
  name: string;
  logo: string;
}

interface Hackathon {
  id: number;
  title: string;
  img: string;
  date: string;
  registration: string;
  location: string;
  prize: string;
  tags: string[];
  description: string;
  timeline: TimelineItem[];
  organizers: Organizer[];
  requirements: string;
}

// Sample hackathon data (in a real app, this would be fetched from an API)
const hackathons: Hackathon[] = [
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
    timeline: [
      { phase: "Registration", date: "May 1 - June 15, 2025" },
      { phase: "Team Formation", date: "June 15 - June 30, 2025" },
      { phase: "Hackathon", date: "July 1 - July 31, 2025" },
      { phase: "Judging", date: "August 1 - August 10, 2025" },
      { phase: "Winners Announced", date: "August 15, 2025" }
    ],
    organizers: [
      { name: "AI Global Foundation", logo: "/logos/ai-global.png" },
      { name: "TechCorp Industries", logo: "/logos/techcorp.png" }
    ],
    requirements: "Teams of 2-5 members. At least one team member must have experience with machine learning frameworks."
  },
  // ... other hackathons remain the same
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
    timeline: [
      { phase: "Registration", date: "June 1 - July 20, 2025" },
      { phase: "Team Formation", date: "July 20 - August 4, 2025" },
      { phase: "Hackathon", date: "August 5 - August 25, 2025" },
      { phase: "Judging", date: "August 26 - September 5, 2025" },
      { phase: "Winners Announced", date: "September 10, 2025" }
    ],
    organizers: [
      { name: "CAI Club", logo: "/logos/cai-club.png" },
      { name: "Digital Economy Promotion Agency", logo: "/logos/depa.png" }
    ],
    requirements: "Open to all participants. Teams of 3-4 members recommended."
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
    timeline: [
      { phase: "Registration", date: "July 15 - August 31, 2025" },
      { phase: "Challenge 1", date: "September 10 - September 15, 2025" },
      { phase: "Challenge 2", date: "September 16 - September 23, 2025" },
      { phase: "Final Challenge", date: "September 24 - September 30, 2025" },
      { phase: "Winners Announced", date: "October 10, 2025" }
    ],
    organizers: [
      { name: "AI Academy", logo: "/logos/ai-academy.png" }
    ],
    requirements: "Individual participation only. Basic knowledge of Python and machine learning libraries required."
  },
  {
    id: 4,
    title: "Experiential Learning Program (ELP) #3",
    img: "/news/hackathon4.png",
    date: "Oct 15 – Oct 20, 2025",
    registration: "Registration open until September 30, 2025",
    location: "London, UK",
    prize: "£30,000",
    tags: ["Climate Tech", "Sustainability", "IoT"],
    description: "Build innovative solutions to combat climate change and promote sustainability.",
    timeline: [
      { phase: "Registration", date: "August 1 - September 30, 2025" },
      { phase: "Team Formation", date: "October 1 - October 14, 2025" },
      { phase: "Hackathon", date: "October 15 - October 20, 2025" },
      { phase: "Winners Announced", date: "October 21, 2025" }
    ],
    organizers: [
      { name: "Green Tech Initiative", logo: "/logos/greentech.png" },
      { name: "London Climate Council", logo: "/logos/lcc.png" }
    ],
    requirements: "Teams of 2-5 members. All experience levels welcome."
  }
];

export default function HackathonDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For this prototype, we'll use the sample data
    const hackathonId = parseInt(id as string);
    const foundHackathon = hackathons.find(h => h.id === hackathonId);
    
    if (foundHackathon) {
      setHackathon(foundHackathon);
    } else {
      // Hackathon not found, redirect to news page
      router.push('/news');
    }
    
    setLoading(false);
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="text-orange-500 font-bold text-xl">Loading...</div>
      </div>
    );
  }

  if (!hackathon) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 px-4 py-16 sm:px-8">
      {/* Rest of your component remains the same */}
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link 
            href="/news" 
            className="flex items-center text-orange-500 hover:text-orange-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Hackathons
          </Link>
        </motion.div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <motion.div 
            className="relative h-64 sm:h-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Image 
              src={hackathon.img} 
              alt={hackathon.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
              <div className="p-6 text-white">
                <motion.h1 
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {hackathon.title}
                </motion.h1>
                <motion.p 
                  className="text-lg opacity-90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {hackathon.date}
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Content section remains the same */}
          <div className="p-6">
            {/* Tags */}
            <motion.div 
              className="flex flex-wrap gap-2 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {hackathon.tags.map(tag => (
                <span 
                  key={tag} 
                  className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">About</h2>
                  <p className="mt-2 text-gray-600">{hackathon.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Prize</h2>
                  <p className="mt-2 font-bold text-xl text-orange-500">{hackathon.prize}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Requirements</h2>
                  <p className="mt-2 text-gray-600">{hackathon.requirements}</p>
                </div>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Location</h2>
                  <div className="flex items-center mt-2">
                    <span className="text-gray-600 text-2xl mr-2">📍</span>
                    <span className="text-gray-600">{hackathon.location}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Registration</h2>
                  <p className="mt-2 text-gray-600">{hackathon.registration}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Organized by</h2>
                  <div className="mt-2 flex items-center flex-wrap gap-4">
                    {hackathon.organizers.map(org => (
                      <div key={org.name} className="flex items-center">
                        <div className="bg-gray-100 p-1 rounded-full mr-2">
                          <div className="w-6 h-6 flex items-center justify-center text-lg">🏢</div>
                        </div>
                        <span className="text-gray-700">{org.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Timeline */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Timeline</h2>
              <div className="relative pl-8 border-l-2 border-orange-200 space-y-6">
                {hackathon.timeline.map((item, index) => (
                  <motion.div 
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs">
                      {index + 1}
                    </div>
                    <h3 className="font-medium text-gray-800">{item.phase}</h3>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Register Button */}
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
            >
              <button 
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-xl hover:shadow-lg transition"
                onClick={() => alert(`Registration for ${hackathon.title} coming soon!`)}
              >
                Register for this Hackathon
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}