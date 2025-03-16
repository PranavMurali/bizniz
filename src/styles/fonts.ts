import { Germania_One } from "next/font/google";
import localFont from "next/font/local";

const sourceCodePro400 = Germania_One({ weight: "400", subsets: ["latin"] });
const greatVibes = localFont({ src: "../../public/Gameplay.ttf" });

export { sourceCodePro400, greatVibes };
