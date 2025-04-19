import Image from "next/image";
import Link from "next/link";

const newsItems = [
  {
    id: 1,
    title: "International Artificial Intelligence Hackathon 2025",
    img: "/news/hackathon1.png",
    link: "/news/1",
    date: "Registration: Jul 1 – Jul 31, 2025",
  },
  {
    id: 2,
    title: "CAI Club Hackathon 2025",
    img: "/news/hackathon2.png",
    link: "/news/2",
    date: "Registration: Aug 5 – Aug 25, 2025",
  },
  {
    id: 3,
    title: "Super AI Engineer Season 5",
    img: "/news/hackathon3.jpg",
    link: "/news/3",
    date: "Registration: Sep 10 – Sep 30, 2025",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 p-8 space-y-16">
      {/* … Hero … */}

      {/* News Carousel */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Latest News</h2>
        <div className="flex overflow-x-auto space-x-6 py-4 scrollbar-hide">
          {newsItems.map((n) => (
            <Link
              key={n.id}
              href={n.link}
              className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={n.img}
                  alt={n.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {n.title}
                </h3>
                <p className="text-sm text-gray-500">{n.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* … other sections … */}
    </div>
  );
}