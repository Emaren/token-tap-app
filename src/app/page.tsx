'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const hour = new Date().getHours()
  const initialColorMode = hour % 2 === 0
  const [colorMode, setColorMode] = useState(initialColorMode)
  const toggleColorMode = () => setColorMode((prev) => !prev)

  return (
    <main className="min-h-[100dvh] bg-black text-white flex flex-col items-center justify-between px-4 py-8 overflow-hidden">
      {/* 🔷 Logo */}
      <button
        type="button"
        onClick={toggleColorMode}
        className="mt-8 mb-6 relative w-32 h-32 md:w-40 md:h-40 cursor-pointer"
        aria-label="Toggle TokenTap color mode"
      >
        <img
          src="/images/ttt-logo.png"
          alt="TokenTap Logo"
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ease-out ${
            colorMode ? 'opacity-100' : 'opacity-0'
          }`}
          loading="eager"
        />
        <img
          src="/images/pinktt-logo.png"
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-150 ease-out ${
            colorMode ? 'opacity-0' : 'opacity-100'
          }`}
          loading="eager"
        />
      </button>

      {/* 🔸 Centered Text */}
      <div className="flex flex-col items-center justify-center text-center px-4">
        <h1
          onClick={toggleColorMode}
          className={`cursor-pointer text-5xl md:text-6xl font-bold mb-6 inline-block transition-all duration-150 ease-out ${
            colorMode
              ? 'text-white border border-white px-8 py-2 rounded-full tracking-tight'
              : 'bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text'
          }`}
        >
          TokenTap
        </h1>

        <p className="text-lg md:text-xl text-white/80 mb-2">Loyalty Tokens.</p>
        <p className="text-lg md:text-xl text-white/80 mb-10">
          Your brand, your token, your{' '}
          <span
            className={
              colorMode
                ? 'decoration-pink-500'
                : 'decoration-white/40'
            }
          >
            rules
          </span>
          .
        </p>

        <Link href="/get-started">
          <button
            className={`font-semibold text-lg px-8 py-3 rounded-full shadow-md hover:scale-105 transition transform duration-150 ease-out ${
              colorMode
                ? 'bg-black border border-white text-white'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
            }`}
          >
            Get Started
          </button>
        </Link>
      </div>

      {/* 🔻 Footer */}
      <footer className="mt-12 text-sm text-white/40 text-center">
        &copy; {new Date().getFullYear()} TokenTap.ca
      </footer>
    </main>
  )
}
