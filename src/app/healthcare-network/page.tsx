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
          <div key={provider.name} className="surface-card p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">{provider.specialty}</p>
            <h3 className="mt-3 text-xl font-semibold text-white">{provider.name}</h3>
          </div>
        ))}
      </section>
    </SiteShell>
  );
}
