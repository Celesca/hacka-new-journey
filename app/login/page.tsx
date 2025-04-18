import LoginForm from "@/components/LoginForm";
import Image from 'next/image';

export default function LoginPage() {
    return (
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Hero Section */}
        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-400 animate-pulse">
          <Image
            src="/hackathon.jpg"
            alt="Team matching hero"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
        {/* Form Section */}
        <div className="flex items-center justify-center p-8 bg-white">
          <LoginForm />
        </div>
      </div>
    );
  }