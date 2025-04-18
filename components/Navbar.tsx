import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="w-full bg-white/70 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-600">
          Hacka
        </Link>

        {/* Menu Links */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link href="/news" className="text-gray-700 hover:text-orange-500 transition">
              News
            </Link>
          </li>
          <li>
            <Link href="/match" className="text-gray-700 hover:text-orange-500 transition">
              Match (Tinder)
            </Link>
          </li>
        </ul>

        {/* Profile */}
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-yellow-400">
              <Image
                src="/avatar-placeholder.png"
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
        </div>
      </div>
    </nav>
  );
}