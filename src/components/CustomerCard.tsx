'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function CustomerCard({
  href,
  image,
  emoji,
  name,
  subtitle,
  price,
  bullets,
  priority = false,
}: {
  href: string
  image: string
  emoji: string
  name: string
  subtitle: string
  price: string
  bullets: string[]
  priority?: boolean
}) {
  return (
    <div className="mb-6">
      <br />
      <Link href={href}>
        <div className="relative h-[220px] rounded-2xl overflow-hidden border-2 border-white shadow-lg transition hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer">
          <Image
            src={image}
            alt={`${name} logo`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 448px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/20 flex items-end p-5">
            <div className="text-left text-white w-full">
              <h3 className="text-lg font-bold">
                {emoji} {name}
              </h3>
              <p className="text-sm text-white/70">{subtitle}</p>
              <p className="text-md font-semibold mt-1">{price}</p>
              {Array.isArray(bullets) && bullets.length > 0 && (
                <ul className="text-xs text-white/70 mt-1 space-y-0.5">
                  {bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
