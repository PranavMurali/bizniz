'use client'

import { getStatus, logout } from "@/actions/auth";
import { getBusinessCard } from "@/actions/getBusinessCard";
import SearchForm from "@/components/search-form";
import SettingsForm from "@/components/settings-form";
import { FloatingDock } from "@/components/ui/floating-dock";
import { GlareCard } from "@/components/ui/glare-card";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { IconCards, IconLogin, IconLogout, IconSettings } from "@tabler/icons-react";
import { useEffect, useState } from "react";


export type Tag = {
  id: string;
  text: number;
};

export type CardData = {
  id: string;
  title: string | null;
  name: string | null;
  position?: string;
  email: string | null;
  phone: string | null;
  company?: string | null;
  website?: string | null;
  address?: string | null;
  info_visibility: string | string[];
  shareception: boolean;
  shareslug: string;
  tags: Tag[];
};

export default function Page() {
  const [bCard, setBCard] = useState<CardData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCard, setActiveCard] = useState<string>("")
  const [auth, setAuth] = useState(false)
  const [settings, setSettings] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const card = await getBusinessCard()
      const authStatus = await getStatus()
      setAuth(authStatus)
      setBCard(card as unknown as CardData[])
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
    <SidebarProvider className="flex flex-col items-center justify-center h-full gap-10 mt-5">
      <div className="flex justify-center items-center flex-col gap-4">
        {loading ? (<><div className="mt-4 z-10">
          <Skeleton className="h-[500px] w-[300px] rounded-xl" />
        </div>
          <div className="mt-4">
            <Skeleton className="h-[60px] w-[200px] rounded-xl" />
          </div>
          <div className="flex flex-col space-y-3 mt-10">
            <Skeleton className="h-[40px] w-[400px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[250px]" />
            </div>
          </div> </>) :
          <>
            <GlareCard cards={bCard} activeCardId={activeCard} />
            <div className="mt-4 z-10">
              <FloatingDock items={links} />
            </div>
            <SettingsForm settings={settings} setSettings={setSettings} />
            <div className="mt-10">
              <SearchForm setActiveCard={setActiveCard} />
            </div>
          </>}
      </div>
    </SidebarProvider>
  );
}

