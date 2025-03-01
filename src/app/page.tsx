'use client'

import { FloatingDock } from "@/components/ui/floating-dock";
import { GlareCard } from "@/components/ui/glare-card";
import { IconHome, IconNewSection } from "@tabler/icons-react";

type CardData = {
  title: string;
  name: string;
  position: string;
  email: string;
  phone: string;
};

const cardData: CardData[] = [
  {
    title: "Business Name",
    name: "John Doe",
    position: "CEO",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
  },
  {
    title: "MONKE",
    name: "John Doe",
    position: "CEO",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
  },
  {
    title: "FAFAF",
    name: "John Doe",
    position: "CEO",
    email: "johndoe@example.com",
    phone: "+1 234 567 890",
  },
];

export default function Page() {
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
      <GlareCard cards={cardData} />
      <div className="mt-10 z-10">
        <FloatingDock items={links} />
      </div>
    </div>
  );
}
