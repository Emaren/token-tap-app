'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const hour = new Date().getUTCHours()
  const initialColorMode = hour % 2 === 0
  const [colorMode, setColorMode] = useState(initialColorMode)
  const toggleColorMode = () => setColorMode((prev) => !prev)

  return (
    <main
      className="
        min-h-[100dvh] [min-height:100svh]
        bg-black text-white
        flex flex-col items-center
        px-4 overflow-hidden
        [padding-top:calc(1.75rem+env(safe-area-inset-top))]
        [padding-bottom:calc(1.0rem+env(safe-area-inset-bottom))]
      "
    >
      {/* 🔷 Top Logo */}
      <button
        type="button"
        onClick={toggleColorMode}
        className="relative w-32 h-32 md:w-40 md:h-40 cursor-pointer bg-transparent p-0
                   select-none touch-manipulation [-webkit-tap-highlight-color:transparent]
                   outline-none focus:outline-none shrink-0
                   mb-10 md:mb-14"
        aria-label="Toggle TokenTap color mode"
      >
        <Image
          src="/images/ttt-logo.png"
          alt="TokenTap Logo"
          fill
          sizes="(min-width: 768px) 10rem, 8rem"
          priority
          draggable={false}
          className={`pointer-events-none absolute inset-0 w-full h-full object-contain transform-gpu [will-change:opacity]
            transition-opacity duration-150 ease-out ${colorMode ? 'opacity-100' : 'opacity-0'}`}
        />
        <Image
          src="/images/pinktt-logo.png"
          alt=""
          fill
          sizes="(min-width: 768px) 10rem, 8rem"
          priority
          draggable={false}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 w-full h-full object-contain transform-gpu [will-change:opacity]
            transition-opacity duration-150 ease-out ${colorMode ? 'opacity-0' : 'opacity-100'}`}
        />
      </button>

      {/* 🔸 Middle (stretched spacing) */}
      <div className="flex-1 w-full flex items-center justify-center">
        <div
          className="
            w-full max-w-xl
            flex flex-col items-center text-center
            justify-between
            min-h-[380px] sm:min-h-[420px] md:min-h-[520px]
            py-6 md:py-10
          "
        >
          {/* Top cluster */}
          <div className="flex flex-col items-center">
            {/* Fixed-size pill; inner text fades (no iPhone snap) */}
            <h1
              onClick={toggleColorMode}
              className={`cursor-pointer text-5xl md:text-6xl font-bold tracking-tight
                inline-block px-8 py-2 rounded-full border
                select-none touch-manipulation [-webkit-tap-highlight-color:transparent]
                transition-colors duration-150 ease-out relative
                ${colorMode ? 'border-white' : 'border-transparent'}`}
            >
              <span className="invisible">TokenTap</span>

              <span
                className={`absolute inset-0 flex items-center justify-center transform-gpu [will-change:opacity]
                  transition-opacity duration-150 ease-out ${colorMode ? 'opacity-100' : 'opacity-0'} text-white`}
              >
                TokenTap
              </span>

              <span
                aria-hidden="true"
                className={`absolute inset-0 flex items-center justify-center transform-gpu [will-change:opacity]
                  transition-opacity duration-150 ease-out ${colorMode ? 'opacity-0' : 'opacity-100'}
                  bg-gradient-to-r from-purple-500 to-pink-600 text-transparent bg-clip-text`}
              >
                TokenTap
              </span>
            </h1>

            <div className="h-6 md:h-8" />

            <div className="text-lg md:text-xl text-white/80 leading-relaxed">
            <p>Loyalty Tokens.</p>
            <p className="mt-3 md:mt-4">
              Your brand, your token, your{' '}
              <span className={colorMode ? 'decoration-pink-500' : 'decoration-white/40'}>rules</span>.
            </p>
          </div>

          </div>

          {/* Bottom cluster (pushes button down = more breathing room) */}
          <div className="pt-10 md:pt-12">
            <Link href="/get-started">
              <button
                className={`font-semibold text-lg px-8 py-3 rounded-full shadow-md hover:scale-105
                  transition-transform duration-150 ease-out border
                  ${
                    colorMode
                      ? 'bg-black border-white text-white'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white'
                  }`}
              >
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* 🔻 Footer pinned to bottom */}
      <footer className="shrink-0 text-sm text-white/40 text-center w-full">
        &copy; {new Date().getFullYear()} TokenTap.ca
      </footer>
    </main>
  )
}
