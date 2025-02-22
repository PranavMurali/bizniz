import { auth } from "@/auth";
import Image from "next/image";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ProfileInfoForm } from "@/components/info-form";

export default async function UserInfo() {
  const session = await auth();

  return (
    <CardSpotlight className="w-1/2 justify-center items-center mx-auto mt-10">
      {session?.user?.image && (
        <div className="h-40 w-40 rounded-full bg-white flex justify-center items-center mx-auto relative z-20">
          <Image
            src={session.user.image}
            className="flex justify-center mx-auto"
            width={200}
            height={200}
            alt={session.user.name ?? "Avatar"}
            style={{ borderRadius: "50%" }}
          />
        </div>
      )}
      <p className="text-xl font-bold relative z-20 mt-2 text-white">
        {session?.user?.name}
      </p>
      <text className="text-lg text-white relative z-20">
        {session?.user?.email}
      </text>
      <div className=" relative z-20 mt-5">
        <ProfileInfoForm />
      </div>
    </CardSpotlight>
  );
}
