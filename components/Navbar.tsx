import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="w-full bg-white sticky top-0 z-50 shadow-md">
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
      Match
    </Link>
  </li>
  <li>
    <Link
      href="/chat"
      className="flex items-center text-gray-700 hover:text-orange-500 transition"
    >
      {/* chat bubble icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.2-4A7.97 7.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
      <span className="ml-1">Chat</span>
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