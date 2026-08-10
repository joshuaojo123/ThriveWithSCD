"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { useAuth } from "@/context/auth-context";
import { useCommunity } from "@/context/community-context";
import {
  Bell,
  Bookmark,
  BookOpen,
  CalendarDays,
  Coffee,
  Globe,
  Heart,
  Home,
  LayoutDashboard,
  MessageCircle,
  Menu,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Video,
  X,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

const drawerItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/community", label: "Community Feed", icon: Users },
  { href: "/education", label: "Education Hub", icon: BookOpen },
  { href: "/store", label: "Thrive Store", icon: Coffee },
  { href: "/podcasts-videos", label: "Podcasts & Videos", icon: Video },
  { href: "/healthcare-network", label: "Healthcare Network", icon: Heart },
  { href: "/research", label: "Research", icon: Globe },
  { href: "/programs", label: "Programs", icon: CalendarDays },
  { href: "/events", label: "Events", icon: CalendarDays },
  { href: "/assistant", label: "AI Assistant", icon: Sparkles },
  { href: "/donate", label: "Donations", icon: Coffee },
  { href: "/about", label: "About ThriveWithSCD", icon: ShieldCheck },
  { href: "/contact", label: "Contact", icon: LayoutDashboard },
];

const bottomNavItems = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/community", label: "Community", icon: Users },
  { href: "/store", label: "Store", icon: Coffee },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/account", label: "Profile", icon: User },
];

const profileMenuItems = [
  { href: "/users/me", label: "My Profile" },
  { href: "/saved-posts", label: "Saved Posts" },
  { href: "/my-stories", label: "My Stories" },
  { href: "/my-products", label: "My Products" },
  { href: "/messages", label: "Messages" },
  { href: "/settings", label: "Settings" },
  { href: "/privacy", label: "Privacy" },
];

function getInitials(name: string | undefined) {
  if (!name) return "TW";
  return name
    .split(" ")
    .map((part) => part[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

export function SiteShell({
  children,
  title,
  description,
}: {
  children: ReactNode;
  title: string;
  description: string;
}) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { profiles, posts } = useCommunity();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const isActiveLink = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) {
      return { users: [], posts: [] };
    }

    return {
      users: profiles.filter(
        (profile) =>
          profile.name.toLowerCase().includes(query) || profile.headline.toLowerCase().includes(query),
      ),
      posts: posts.filter((post) => post.content.toLowerCase().includes(query)),
    };
  }, [profiles, posts, searchTerm]);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    router.push("/login");
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <aside className="hidden xl:flex xl:w-80 xl:flex-col xl:border-r xl:border-[var(--surface-border)] xl:bg-[rgba(17,24,39,0.92)] xl:py-8 xl:px-6">
        <div className="sticky top-0 flex h-screen flex-col justify-between">
          <div className="space-y-8">
            <div className="flex items-center gap-3 rounded-4xl border border-[var(--surface-border)] bg-[var(--surface)] px-5 py-4 text-[var(--foreground)] shadow-[0_28px_90px_-40px_rgba(124,58,237,0.35)]">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brand-purple)] text-lg font-semibold text-white">TW</div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-violet-300">ThriveWithSCD</p>
                <p className="text-sm font-semibold text-[var(--foreground)]">Social healthcare platform</p>
              </div>
            </div>

            <nav className="space-y-2">
              {drawerItems.map((item) => {
                const Icon = item.icon;
                const active = isActiveLink(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-3xl px-4 py-4 text-sm font-medium transition ${
                      active ? "bg-[rgba(124,58,237,0.14)] text-white shadow-[0_20px_60px_rgba(124,58,237,0.14)]" : "text-slate-200 hover:bg-[rgba(124,58,237,0.08)] hover:text-white"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? "text-violet-300" : "text-violet-400 group-hover:text-violet-200"}`} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="space-y-4 rounded-4xl border border-slate-800 bg-[#0d1119] p-5 text-sm text-slate-300">
            <p className="font-semibold text-slate-100">Platform focus</p>
            <p>Social connection, trusted health resources, and community support in one seamless app.</p>
            <div className="rounded-3xl bg-[#0a0f18] px-4 py-3 text-sm text-slate-300">
              <div className="flex items-center justify-between text-emerald-300">
                <span>Verified</span>
                <Star className="h-4 w-4" />
              </div>
              <p className="mt-3 text-xs text-slate-500">Admin verification for professionals and organizations.</p>
            </div>
          </div>
        </div>
      </aside>

      {drawerOpen ? <div className="fixed inset-0 z-40 bg-slate-950/60 xl:hidden" onClick={() => setDrawerOpen(false)} /> : null}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-slate-800 bg-[#0d1018] p-5 transition duration-300 xl:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-700 text-white">TW</div>
            <p className="text-sm font-semibold text-white">Explore</p>
          </div>
          <button type="button" onClick={() => setDrawerOpen(false)} className="rounded-full bg-slate-800 p-2 text-slate-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {drawerItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-3 rounded-3xl px-4 py-4 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                <Icon className="h-5 w-5 text-violet-400" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col xl:pl-80">
        <header className="sticky top-0 z-40 border-b border-slate-800 bg-[#050505]/95 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <Link href="/home" className="inline-flex items-center gap-3 rounded-3xl bg-linear-to-br from-violet-700 to-sky-500 px-4 py-2 text-white shadow-[0_20px_60px_rgba(124,58,237,0.18)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold">TW</div>
                <div className="hidden sm:block">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-200">ThriveWithSCD</p>
                </div>
              </Link>
            </div>

            <form className="hidden sm:flex flex-1 justify-center" onSubmit={handleSearchSubmit}>
              <div className="relative flex w-full max-w-2xl items-center gap-3 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2 shadow-sm">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search users, posts, doctors, events..."
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button type="submit" className="hidden">Search</button>
              </div>
            </form>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileSearchOpen((current) => !current)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-100 sm:hidden"
              >
                <Search className="h-5 w-5" />
              </button>
              <Link href="/notifications" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-100">
                <Bell className="h-5 w-5" />
              </Link>
              <Link href="/messages" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-slate-100">
                <MessageCircle className="h-5 w-5" />
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((current) => !current)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-linear-to-br from-violet-600 to-sky-500 text-sm font-semibold text-white shadow-lg"
                >
                  {getInitials(user?.name)}
                </button>
                {profileMenuOpen ? (
                  <div className="absolute right-0 top-14 z-20 w-64 rounded-3xl border border-slate-800 bg-[#0d1018] p-4 shadow-[0_20px_40px_rgba(0,0,0,0.35)]">
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setProfileMenuOpen(false)}
                        className="block rounded-2xl px-3 py-3 text-sm text-slate-100 transition hover:bg-slate-800"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-2 w-full rounded-2xl bg-slate-900 px-3 py-3 text-left text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
                    >
                      Logout
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {mobileSearchOpen ? (
            <form className="border-t border-[var(--surface-border)] bg-[var(--background)] px-4 py-4 sm:hidden" onSubmit={handleSearchSubmit}>
              <div className="relative flex w-full items-center gap-3 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] px-4 py-2">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search platform content..."
                  className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button type="submit" className="hidden">Search</button>
              </div>
            </form>
          ) : null}
        </header>

        <main className="min-h-[calc(100vh-96px)] pb-28 xl:pb-12">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-violet-400">{title}</p>
                <p className="mt-3 text-3xl font-semibold text-white">{description}</p>
              </div>
              <button className="btn-primary">
                <Sparkles className="h-4 w-4" /> Explore all channels
              </button>
            </div>

            {searchTerm.trim().length > 0 ? (
              <div className="mb-6 rounded-[2rem] border border-slate-800 bg-[#0d1018] p-5 shadow-sm">
                <p className="text-sm font-semibold text-white">Search results for “{searchTerm}”</p>
                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  <div className="rounded-[1.5rem] bg-slate-900 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">Users</p>
                    {searchResults.users.length === 0 ? (
                      <p className="mt-3 text-sm text-slate-400">No users found.</p>
                    ) : (
                      searchResults.users.map((profile) => (
                        <Link
                          key={profile.id}
                          href={`/users/${profile.id}`}
                          className="mt-3 block rounded-2xl bg-[#111827] p-3 text-sm text-slate-100 shadow-sm transition hover:bg-slate-800"
                        >
                          <p className="font-semibold text-white">{profile.name}</p>
                          <p className="mt-1 text-sm text-slate-400">{profile.headline}</p>
                        </Link>
                      ))
                    )}
                  </div>
                  <div className="rounded-[1.5rem] bg-slate-900 p-4">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">Posts</p>
                    {searchResults.posts.length === 0 ? (
                      <p className="mt-3 text-sm text-slate-400">No posts found.</p>
                    ) : (
                      searchResults.posts.map((post) => (
                        <div key={post.id} className="mt-3 rounded-2xl bg-[#111827] p-3 shadow-sm">
                          <p className="text-sm text-slate-300">{post.content.slice(0, 120)}...</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : null}

            {children}
          </div>
        </main>
      </div>

      <a
        href="/assistant"
        className="fixed right-5 bottom-24 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(124,58,237,0.25)] transition hover:scale-[1.02]"
      >
        <Sparkles className="h-4 w-4" />
        AI Assistant
      </a>
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-1 border-t border-slate-800 bg-[#050505]/95 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] xl:hidden">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActiveLink(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 rounded-3xl px-2 py-2 text-xs font-medium transition ${
                active ? "bg-slate-900 text-white" : "text-slate-200 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
