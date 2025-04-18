import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl max-w-4xl w-full flex flex-col lg:flex-row overflow-hidden animate-fadeIn">
        {/* Profile Image */}
        <div className="relative lg:w-1/3 h-64 lg:h-auto">
          <Image
            src="/profile-pic.jpg"
            alt="Profile Picture"
            fill
            className="object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="p-8 flex-1 space-y-6">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
            Jane Doe, 28
          </h2>
          <p className="text-gray-600">📍 San Francisco, CA</p>
          <p className="text-gray-700">
            Passionate developer looking to join a hackathon team to build
            something amazing! Experienced in React, Node.js, and UI/UX design.
          </p>

          {/* Skills / Tags */}
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Tailwind", "UI/UX", "Next.js"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link
              href="/profile/edit"
              className="flex-1 text-center py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Edit Profile
            </Link>
            <Link
              href="/match"
              className="flex-1 text-center py-3 border-2 border-orange-400 text-orange-600 font-semibold rounded-lg hover:bg-orange-50 transition"
            >
              Find Teammates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}