export default function PricingPage() {
  const tiers = [
    { name: "Demo", price: "$0", note: "Basic demo access" },
    { name: "One-Time", price: "$9", note: "Single token creation, no support" },
    { name: "Starter Monthly", price: "$9/mo", note: "1,000 interactions/mo" },
    { name: "Pro Monthly", price: "$49/mo", note: "10,000 interactions + branding" },
    { name: "Growth", price: "$99/mo", note: "Advanced analytics + team access" },
    { name: "Enterprise", price: "$149/mo", note: "Unlimited, full support, API access" },
  ];

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-start pt-32 px-6">
      <h1 className="text-4xl font-bold mb-12">Pricing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        {tiers.map((tier, index) => (
          <div
            key={index}
              className="border-2 border-white rounded-2xl p-6 text-center transition duration-200 hover:ring-1 hover:ring-white hover:ring-offset-2 hover:ring-offset-black cursor-pointer">
            <h2 className="text-xl font-semibold mb-2">{tier.name}</h2>
            <p className="text-lg font-bold mb-4">{tier.price}</p>
            <p className="text-sm text-white/70">{tier.note}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

