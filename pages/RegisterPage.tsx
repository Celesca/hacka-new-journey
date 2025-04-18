import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-r from-yellow-400 to-orange-400">
      <h1 className="text-4xl font-bold text-white mb-6">Register</h1>
      <RegisterForm />
    </div>
  );
}