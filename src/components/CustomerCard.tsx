'use client'

import Link from 'next/link'

export default function CustomerCard({
  href,
  image,
  emoji,
  name,
  subtitle,
  price,
  bullets,
}: {
  href: string
  image: string
  emoji: string
  name: string
  subtitle: string
  price: string
  bullets: string[]
}) {
  return (
    <div className="mb-6">
      <br/>
      <Link href={href}>
        <div
          className="relative rounded-2xl overflow-hidden border-2 border-white shadow-lg transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '220px',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20 flex items-end p-5">
            <div className="text-left text-white w-full">
              <h3 className="text-lg font-bold">
                {emoji} {name}
              </h3>
              <p className="text-sm text-white/70">{subtitle}</p>
              <p className="text-md font-semibold mt-1">{price}</p>
              <ul className="text-xs text-white/70 mt-1 space-y-0.5">
                {bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
