import { auth } from "@/auth";
import Image from "next/image";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default async function UserInfo() {
  const session = await auth();
  return (
    <CardSpotlight className="h-96 w-96 justify-center items-center mx-auto mt-10">
      {session?.user?.image && (
        <Image
          src={session.user.image}
          className="flex justify-center mx-auto"
          width={200}
          height={200}
          alt={session.user.name ?? "Avatar"}
          style={{ borderRadius: "50%" }}
        />
      )}
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        {session?.user?.name}
      </p>
      <text>
        {session?.user?.email}
      </text>
    </CardSpotlight>
  );
}
