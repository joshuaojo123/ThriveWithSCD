import { SiteShell } from "@/components/site-shell";

const providers = [
  { name: "Dr. Nia Carter", specialty: "Hematology" },
  { name: "Global Care Center", specialty: "Sickle Cell Clinics" },
  { name: "Pathway Research", specialty: "Clinical trials" },
];

export default function HealthcareNetworkPage() {
  return (
    <SiteShell title="Healthcare Network" description="Verified healthcare professionals, institutions, and research partners.">
      <section className="grid gap-6 md:grid-cols-3">
        {providers.map((provider) => (
          <div key={provider.name} className="rounded-[1.5rem] border border-white/70 bg-white/80 p-6 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">{provider.specialty}</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-950">{provider.name}</h3>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
