import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-orange-400 p-8">
      <h1 className="text-4xl font-bold text-white mb-6">Login</h1>
      <LoginForm />
    </div>
  );
}