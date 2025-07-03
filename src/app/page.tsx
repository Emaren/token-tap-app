// src/app/page.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl md:text-7xl font-bold text-center mb-6">
        TokenTap
      </h1>
      <p className="text-xl md:text-2xl text-center max-w-2xl mb-8">
Loyalty Tokens. Your brand, your token, your rules.
      </p>
      <a
        href="#"
        className="bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
      >
        Get Started
      </a>

      <div className="absolute bottom-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TokenTap.ca
      </div>
    </main>
  );
}

