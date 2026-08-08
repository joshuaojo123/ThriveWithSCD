"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";

export default function AccountPage() {
  const router = useRouter();
  const { user, hydrated, logout, updateUser } = useAuth();
  const { profiles, updateProfile } = useCommunity();
  const profile = profiles.find((item) => item.id === user?.id);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [headline, setHeadline] = useState(profile?.headline || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (profile) {
      setHeadline(profile.headline);
      setBio(profile.bio);
      setLocation(profile.location);
      setWebsite(profile.website || "");
    }
  }, [profile]);

  if (!hydrated) {
    return null;
  }

  if (!user) {
    router.replace("/login");
    return null;
  }

  const handleSave = () => {
    updateUser({ name, email });
    updateProfile({
      name,
      headline: headline || "ThriveWithSCD community member.",
      bio,
      location: location || "Global",
      website: website || undefined,
    });
    setMessage("Profile saved successfully.");
  };

  return (
    <SiteShell title="Account" description="Manage your profile, security, and community settings.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="surface-card space-y-6 p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Account settings</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Your personal workspace.</h1>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Update your profile and community presence for a seamless experience across ThriveWithSCD.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="input-field w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Headline</label>
              <input
                value={headline}
                placeholder="Your role or focus area"
                onChange={(event) => setHeadline(event.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Bio</label>
              <textarea
                value={bio}
                placeholder="A short bio for your profile"
                onChange={(event) => setBio(event.target.value)}
                rows={4}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Location</label>
              <input
                value={location}
                placeholder="City, country, or remote"
                onChange={(event) => setLocation(event.target.value)}
                className="input-field"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={logout}
              className="btn-secondary"
            >
              Sign out
            </button>
          </div>

          {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-400">Your profile</p>
            <p className="mt-4 text-sm leading-7 text-slate-300">Use this page to keep your account details aligned with the community experience.</p>
          </div>

          <div className="surface-card p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">Security</p>
            <p className="mt-3 text-sm leading-7 text-slate-300">We store profile settings locally in this prototype. Backend auth is the next production step.</p>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
