/* src/app/page.tsx
   Simple responsive hero for the landing screen
*/
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6">
      {/* Logo / brand */}
      <h1 className="text-5xl font-extrabold tracking-tight mb-4 sm:text-6xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          TokenTap
        </span>
      </h1>

      {/* Tagline */}
      <p className="text-center mb-10 text-lg text-white/80 max-w-sm">
        Loyalty&nbsp;Tokens.<br />
        Your brand, your token, your rules.
      </p>

      {/* CTA */}
      <Link
        href="/get-started"
        className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 text-sm font-semibold shadow-lg transition
                   hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black"
      >
        Get&nbsp;Started
      </Link>

      {/* Footer */}
      <footer className="absolute bottom-6 text-xs text-white/50">
        © {new Date().getFullYear()} TokenTap.ca
      </footer>
    </main>
  );
}
