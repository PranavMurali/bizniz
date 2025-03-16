'use client'

import { getStatus, logout } from "@/actions/auth";
import { getBusinessCard } from "@/actions/getBusinessCard";
import SearchForm from "@/components/search-form";
import SettingsForm from "@/components/settings-form";
import { FloatingDock } from "@/components/ui/floating-dock";
import { GlareCard } from "@/components/ui/glare-card";
import { IconCards, IconHome, IconLogin, IconLogout, IconSettings } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type CardData = {
  id: string;
  title: string | null;
  name: string | null;
  position?: string;
  email: string | null;
  phone: string | null;
  company?: string | null;
  website?: string | null;
  address?: string | null;
};

export default function Page() {
  const [bCard, setBCard] = useState<CardData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCard, setActiveCard] = useState(0)
  const [auth, setAuth] = useState(false)
  const [settings, setSettings] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const card = await getBusinessCard()
      const austh = await getStatus()
      setAuth(austh)
      setBCard(card)
      setLoading(false)
    }
    fetchData()
  }, [])

  const getLinks = () => [
    {
      title: "Card Settings",
      icon: (
        <IconCards className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/me",
    },
    {
      title: "Share Settings",
      icon: (
        <IconSettings className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: undefined,
      onClick: () => setSettings(true),
    },
    {
      title: auth ? "Bye" : "Let me in",
      icon: auth ? (
        <IconLogout className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ) : (
        <IconLogin className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: auth ? undefined : "/let-me-in",
      onClick: auth ? logout : undefined,
    },
  ];

  const links = getLinks();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10 mt-20">
      <SearchForm setActiveCard={setActiveCard} />
      <div className="flex justify-center items-center flex-col gap-4">
        {loading ? <div>Loading...</div> :
          <>
            <GlareCard cards={bCard} activeCardId={activeCard} />
            <div className="mt-10 z-10">
              <FloatingDock items={links} />
            </div>
            <SettingsForm settings={settings} setSettings={setSettings} />
          </>}
      </div>

    </div>
  );
}
