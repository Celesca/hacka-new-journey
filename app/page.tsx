import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "Global Hackathon 2025",
    img: "/news/hackathon1.png",
    link: "/news/1",
  },
  {
    id: 2,
    title: "AI & ML Challenge",
    img: "/news/ai-ml.jpg",
    link: "/news/2",
  },
  {
    id: 3,
    title: "Blockchain Innovation",
    img: "/news/blockchain.jpg",
    link: "/news/3",
  },
];

const chatPreviews = [
  { id: 1, name: "Alex", avatar: "/chat/chat2.jpg", unread: 3 },
  { id: 2, name: "Bella", avatar: "/chat/chat3.jpg", unread: 0 },
  { id: 3, name: "Chris", avatar: "/chat/chat4.jpg", unread: 1 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600">
          Welcome to Hacka
        </h1>
        <p className="text-gray-600 text-lg">
          Connect with teammates, explore news, and join the next big hackathon!
        </p>
        <Link
          href="/match"
          className="inline-block px-6 py-3 bg-gradient-to-r from-orange-400 to-yellow-400 text-white rounded-lg hover:scale-105 transition"
        >
          Find Teammates
        </Link>
      </div>

      {/* News Carousel */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest News</h2>
        <div className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
          {newsItems.map((n) => (
            <Link
              key={n.id}
              href={n.link}
              className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={n.img}
                  alt={n.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {n.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Chat Preview */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Recent Chats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chatPreviews.map((c) => (
            <Link
              key={c.id}
              href={`/chat/${c.id}`}
              className="flex items-center bg-white rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                <Image
                  src={c.avatar}
                  alt={c.name}
                  width={48}
                  height={48}
                  className="object-cover"
                />
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
          ))}
        </div>
      </section>

      {/* Advertisement / Call‑to‑Action */}
      <section>
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between text-white">
          <div className="space-y-2 mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Upgrade to Hacka Pro</h2>
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
        </div>
      </section>
    </div>
  );
}