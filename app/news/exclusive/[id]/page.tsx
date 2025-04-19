"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

interface TeamMember {
    id: string;
    name: string;
    role: string;
    avatar: string;
    skills: string[];
    isLeader?: boolean;
}

interface Team {
    id: string;
    name: string;
    description: string;
    members: TeamMember[];
    maxMembers: number;
    lookingFor: string[];
    tags: string[];
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
    teams?: Team[];
}

// Sample hackathon data with teams
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
        requirements: "Teams of 2-5 members. At least one team member must have experience with machine learning frameworks.",
        teams: []
    },
    // Keep other hackathons the same
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
            { name: "AIAT", logo: "/logos/ai-academy.png" }
        ],
        requirements: "Individual participation only. Basic knowledge of Python and machine learning libraries required.",
        teams: [
            {
                id: "team1",
                name: "Neural Navigators",
                description: "We're building an AI solution for sustainable urban planning.",
                members: [
                    {
                        id: "user1",
                        name: "Alex Chen",
                        role: "ML Engineer",
                        avatar: "/avatars/avatar1.jpg",
                        skills: ["Python", "TensorFlow", "Computer Vision"],
                        isLeader: true
                    },
                    {
                        id: "user2",
                        name: "Jamie Wong",
                        role: "UI/UX Designer",
                        avatar: "/avatars/avatar2.jpg",
                        skills: ["Figma", "User Research", "Prototyping"]
                    }
                ],
                maxMembers: 5,
                lookingFor: ["Backend Developer", "Data Scientist", "Domain Expert"],
                tags: ["Sustainability", "Urban Planning", "Social Impact"]
            },
            {
                id: "team2",
                name: "Deep Learning Dynamos",
                description: "Working on an NLP solution for medical diagnostics.",
                members: [
                    {
                        id: "user3",
                        name: "Sam Patel",
                        role: "Full-stack Developer",
                        avatar: "/avatars/avatar3.jpg",
                        skills: ["JavaScript", "React", "Node.js", "Python"],
                        isLeader: true
                    }
                ],
                maxMembers: 4,
                lookingFor: ["ML Engineer", "Healthcare Professional", "Frontend Developer"],
                tags: ["Healthcare", "NLP", "Diagnostics"]
            }
        ]
    },
    // Keep other hackathons the same
];

// Skills for creating teams
const skillOptions = [
    "Python", "JavaScript", "Machine Learning", "Data Science", "UI/UX",
    "Frontend", "Backend", "Blockchain", "Mobile Development", "Cloud",
    "DevOps", "Product Management", "Project Management", "Domain Expert"
];

export default function ExclusiveHackathonDetailsPage() {
    const router = useRouter();
    const { id } = useParams();
    const [hackathon, setHackathon] = useState<Hackathon | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('info');
    const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
    const [showRequestJoinModal, setShowRequestJoinModal] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

    // Form state for creating a team
    const [teamForm, setTeamForm] = useState({
        name: '',
        description: '',
        maxMembers: 4,
        lookingFor: [] as string[],
        tags: [] as string[]
    });

    // Form state for joining a team
    const [joinRequest, setJoinRequest] = useState({
        name: '',
        role: '',
        skills: [] as string[],
        message: ''
    });

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

    const handleCreateTeam = (e: React.FormEvent) => {
        e.preventDefault();

        if (!hackathon) return;

        // Create a new team with current user as leader
        const newTeam: Team = {
            id: `team${Date.now()}`,
            name: teamForm.name,
            description: teamForm.description,
            members: [
                {
                    id: 'currentUser',
                    name: 'You', // In a real app, this would be the logged-in user
                    role: 'Team Leader',
                    avatar: '/avatars/default.jpg',
                    skills: ['Your Skills'],
                    isLeader: true
                }
            ],
            maxMembers: teamForm.maxMembers,
            lookingFor: teamForm.lookingFor,
            tags: teamForm.tags
        };

        // Add the team to the hackathon
        const updatedHackathon = {
            ...hackathon,
            teams: [...(hackathon.teams || []), newTeam]
        };

        setHackathon(updatedHackathon);
        setShowCreateTeamModal(false);

        // Reset form
        setTeamForm({
            name: '',
            description: '',
            maxMembers: 4,
            lookingFor: [],
            tags: []
        });

        // Show success message
        alert("Team created successfully! Other participants can now request to join your team.");
    };

    const handleJoinRequest = (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedTeam) return;

        // In a real app, this would send the request to the backend
        // For now, we'll just show a confirmation
        alert(`Join request sent to team "${selectedTeam.name}"! The team leader will review your application.`);

        setShowRequestJoinModal(false);
        setJoinRequest({
            name: '',
            role: '',
            skills: [],
            message: ''
        });
    };

    // Helper functions for form handling
    const toggleSkill = (skill: string) => {
        if (joinRequest.skills.includes(skill)) {
            setJoinRequest({
                ...joinRequest,
                skills: joinRequest.skills.filter(s => s !== skill)
            });
        } else {
            setJoinRequest({
                ...joinRequest,
                skills: [...joinRequest.skills, skill]
            });
        }
    };

    const toggleLookingFor = (role: string) => {
        if (teamForm.lookingFor.includes(role)) {
            setTeamForm({
                ...teamForm,
                lookingFor: teamForm.lookingFor.filter(r => r !== role)
            });
        } else {
            setTeamForm({
                ...teamForm,
                lookingFor: [...teamForm.lookingFor, role]
            });
        }
    };

    const toggleTag = (tag: string) => {
        if (teamForm.tags.includes(tag)) {
            setTeamForm({
                ...teamForm,
                tags: teamForm.tags.filter(t => t !== tag)
            });
        } else {
            setTeamForm({
                ...teamForm,
                tags: [...teamForm.tags, tag]
            });
        }
    };

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
                        <div className="absolute top-4 right-4 z-10">
                            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold py-1 px-4 rounded-full shadow-lg">
                                EXCLUSIVE EVENT
                            </span>
                        </div>
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

                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <div className="flex">
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`px-6 py-4 text-sm font-medium ${activeTab === 'info' ?
                                    'border-b-2 border-orange-500 text-orange-600' :
                                    'text-gray-500 hover:text-gray-700'}`}
                            >
                                Event Info
                            </button>
                            <button
                                onClick={() => setActiveTab('teams')}
                                className={`px-6 py-4 text-sm font-medium ${activeTab === 'teams' ?
                                    'border-b-2 border-orange-500 text-orange-600' :
                                    'text-gray-500 hover:text-gray-700'}`}
                            >
                                Team Matching
                            </button>
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === 'info' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {hackathon.tags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Info Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-4">
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
                                    </div>

                                    <div className="space-y-4">
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
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Timeline</h2>
                                    <div className="relative pl-8 border-l-2 border-orange-200 space-y-6">
                                        {hackathon.timeline.map((item, index) => (
                                            <div key={index} className="relative">
                                                <div className="absolute -left-10 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-xs">
                                                    {index + 1}
                                                </div>
                                                <h3 className="font-medium text-gray-800">{item.phase}</h3>
                                                <p className="text-sm text-gray-600">{item.date}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Register Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => setActiveTab('teams')}
                                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-xl hover:shadow-lg transition"
                                    >
                                        Find or Create a Team
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'teams' && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold text-gray-800">Teams</h2>
                                        <button
                                            onClick={() => setShowCreateTeamModal(true)}
                                            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-lg hover:shadow-md transition"
                                        >
                                            Create a Team
                                        </button>
                                    </div>

                                    {/* Team Cards */}
                                    {hackathon.teams && hackathon.teams.length > 0 ? (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {hackathon.teams.map(team => (
                                                <motion.div
                                                    key={team.id}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                                                >
                                                    <div className="p-5">
                                                        <h3 className="font-bold text-xl mb-2">{team.name}</h3>
                                                        <p className="text-gray-600 mb-4">{team.description}</p>

                                                        {/* Team Tags */}
                                                        <div className="flex flex-wrap gap-2 mb-4">
                                                            {team.tags.map(tag => (
                                                                <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        {/* Team Members */}
                                                        <div className="mb-4">
                                                            <h4 className="text-sm font-semibold text-gray-500 mb-2">TEAM ({team.members.length}/{team.maxMembers})</h4>
                                                            <div className="flex -space-x-2 overflow-hidden">
                                                                {team.members.map(member => (
                                                                    <div key={member.id} className="relative inline-flex">
                                                                        <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-white">
                                                                            <Image
                                                                                src={member.avatar || "/avatars/default.jpg"}
                                                                                alt={member.name}
                                                                                width={32}
                                                                                height={32}
                                                                                className="object-cover"
                                                                            />
                                                                        </div>
                                                                        {member.isLeader && (
                                                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 border border-white rounded-full"></span>
                                                                        )}
                                                                    </div>
                                                                ))}
                                                                {team.members.length < team.maxMembers && (
                                                                    <div className="w-8 h-8 rounded-full bg-gray-100 border border-white flex items-center justify-center text-gray-500 text-xs">
                                                                        +{team.maxMembers - team.members.length}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Looking For */}
                                                        {team.lookingFor.length > 0 && (
                                                            <div className="mb-4">
                                                                <h4 className="text-sm font-semibold text-gray-500 mb-2">LOOKING FOR</h4>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {team.lookingFor.map(role => (
                                                                        <span key={role} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                                                            {role}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Join Button */}
                                                        {team.members.length < team.maxMembers && (
                                                            <div className="text-right">
                                                                <button
                                                                    className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition"
                                                                    onClick={() => {
                                                                        setSelectedTeam(team);
                                                                        setShowRequestJoinModal(true);
                                                                    }}
                                                                >
                                                                    Request to Join
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-xl">
                                            <div className="text-6xl mb-4">🤝</div>
                                            <h3 className="text-xl font-medium text-gray-700 mb-2">No Teams Yet</h3>
                                            <p className="text-gray-500 mb-6">Be the first to create a team for this hackathon!</p>
                                            <button
                                                onClick={() => setShowCreateTeamModal(true)}
                                                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-lg hover:shadow-md transition"
                                            >
                                                Create Your Team
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Create Team Modal */}
            <AnimatePresence>
                {showCreateTeamModal && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-800">Create a Team</h3>
                                <button
                                    onClick={() => setShowCreateTeamModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleCreateTeam} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Team Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        value={teamForm.name}
                                        onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                    <textarea
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        value={teamForm.description}
                                        onChange={(e) => setTeamForm({ ...teamForm, description: e.target.value })}
                                        rows={3}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Team Size</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        value={teamForm.maxMembers}
                                        onChange={(e) => setTeamForm({ ...teamForm, maxMembers: parseInt(e.target.value) })}
                                    >
                                        {[2, 3, 4, 5, 6].map(size => (
                                            <option key={size} value={size}>{size} members</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Looking For</label>
                                    <div className="flex flex-wrap gap-2">
                                        {skillOptions.map(skill => (
                                            <button
                                                type="button"
                                                key={skill}
                                                onClick={() => toggleLookingFor(skill)}
                                                className={`px-3 py-1 rounded-full text-sm ${teamForm.lookingFor.includes(skill)
                                                        ? 'bg-blue-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {skill}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Tags</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["AI", "Mobile", "Web", "Social Impact", "Healthcare", "Education", "Environment", "Finance"].map(tag => (
                                            <button
                                                type="button"
                                                key={tag}
                                                onClick={() => toggleTag(tag)}
                                                className={`px-3 py-1 rounded-full text-sm ${teamForm.tags.includes(tag)
                                                        ? 'bg-orange-500 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowCreateTeamModal(false)}
                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-lg hover:shadow-md transition"
                                    >
                                        Create Team
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Request to Join Modal */}
            <AnimatePresence>
                {showRequestJoinModal && selectedTeam && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-800">Join &ldquo;{selectedTeam.name}&rdquo;</h3>
                                <button
                                    onClick={() => setShowRequestJoinModal(false)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={handleJoinRequest} className="p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        value={joinRequest.name}
                                        onChange={(e) => setJoinRequest({ ...joinRequest, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Role You&apos;re Applying For</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                                        value={joinRequest.role}
                                        onChange={(e) => setJoinRequest({ ...joinRequest, role: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a role</option>
                                        {selectedTeam.lookingFor.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}