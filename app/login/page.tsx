import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Hero Section */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-tr from-yellow-300 to-orange-400">
        <div className="w-3/4 h-3/4 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn">
          <Image
            src="/hackathon.jpg"
            alt="Team matching hero"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex flex-1 items-center justify-center p-6 bg-white/70 backdrop-blur-sm">
        <div className="w-full max-w-md space-y-8 animate-fadeIn">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-600 text-center">
            Hacka
          </h1>
          <p className="text-center text-gray-600">
            Connect. Collaborate. Create.
          </p>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}