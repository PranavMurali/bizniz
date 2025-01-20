'use client'

import { FloatingDock } from "@/components/ui/floating-dock";
import { GlareCard } from "@/components/ui/glare-card";
import { IconHome, IconNewSection } from "@tabler/icons-react";


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
      <GlareCard>
        <div className="p-4 flex flex-col">
          <h2 className="font-bold mb-2 text-8xl">Business Name</h2>
          <p className="text-gray-400 mb-1 text-4xl">John Doe</p>
          <p className="text-gray-400 mb-1 text-4xl">CEO</p>
          <p className="text-gray-400 mb-1 text-4xl">johndoe@example.com</p>
          <p className="text-gray-400 text-4xl">+1 234 567 890</p>
        </div>
      </GlareCard>
      <FloatingDock
        items={links} />
    </div>
  )
}
