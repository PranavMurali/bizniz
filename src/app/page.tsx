'use client'

import { getBusinessCard } from "@/actions/getBusinessCard";
import { FloatingDock } from "@/components/ui/floating-dock";
import { GlareCard } from "@/components/ui/glare-card";
import { IconHome, IconNewSection } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type CardData = {
  title: string;
  name: string;
  position: string;
  email: string;
  phone: string;
};

export default function Page() {
  const [bCard, setBCard] = useState<CardData>([])

  useEffect(() => {
    async function fetchData() {
      const card = await getBusinessCard()
      setBCard(card)
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
    <div className="flex justify-center items-center h-screen flex-col gap-4">

      <GlareCard cards={bCard} />
      <div className="mt-10 z-10">
        <FloatingDock items={links} />
      </div>
    </div>
  );
}
