import { SiteShell } from "@/components/site-shell";

const products = [
  { name: "ThriveHeat", blurb: "Gentle warming support for comfort and recovery." },
  { name: "ThriveOxy", blurb: "Adaptive wellness tools designed for daily life." },
  { name: "ThriveTemp Flask", blurb: "A beautifully engineered hydration companion." },
];

export default function StorePage() {
  return (
    <SiteShell title="Thrive Store" description="A premium product experience for tools, wellness, and future-ready health innovation.">
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Premium products</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">Designed to support wellness, comfort, and modern care.</h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            From everyday essentials to future-facing devices, the Thrive Store is shaped to feel refined,
            useful, and deeply intentional.
          </p>
        </div>
        <div className="surface-panel p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Coming soon</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">Secure checkout, order tracking, and wishlist-ready architecture.</h3>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {products.map((product) => (
          <div key={product.name} className="surface-panel p-6">
            <div className="h-24 rounded-[1rem] bg-gradient-to-br from-violet-500/20 to-emerald-400/20" />
            <h3 className="mt-4 text-xl font-semibold text-white">{product.name}</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">{product.blurb}</p>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
