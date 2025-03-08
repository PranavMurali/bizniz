'use client'

import { getBusinessCard } from "@/actions/getBusinessCard";
import SearchForm from "@/components/search-form";
import { LogoutButton } from "@/components/ui/auth/auth-buttons";
import { FloatingDock } from "@/components/ui/floating-dock";
import { GlareCard } from "@/components/ui/glare-card";
import { Input } from "@/components/ui/input";
import { IconHome, IconNewSection, IconSearch } from "@tabler/icons-react";
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
  useEffect(() => {
    async function fetchData() {
      const card = await getBusinessCard()
      setBCard(card)
      setLoading(false)
    }
    fetchData()
  }, [])

  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Auth",
      icon: (
        <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/let-me-in",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <LogoutButton/>
      <SearchForm setActiveCard={setActiveCard}/>
      <div className="flex justify-center items-center flex-col gap-4">
        {loading ? <div>Loading...</div> :
          <>
            <GlareCard cards={bCard} activeCardId={activeCard}/>
            <div className="mt-10 z-10">
              <FloatingDock items={links} />
            </div>
          </>}
      </div>
    </div>
  );
}
