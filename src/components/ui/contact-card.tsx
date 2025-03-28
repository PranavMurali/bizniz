import {
    useSidebar
} from "@/components/ui/sidebar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { handleNfcInteraction } from "@/lib/nfc";
import {
    motion,
    useMotionValue,
    useTransform
} from "framer-motion";
import { Nfc, NfcIcon, Settings } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface CardProps {
    cardCount: number;
    frontCard: boolean;
    drag: boolean | "x" | "y";
    setActiveCardKey: (key: number) => void;
    children: React.ReactNode;
    onPress: () => void;
    edit?: boolean;
    backgroundColor: string;
    isNfcActive?: boolean;
    setIsNfcActive?: (value: boolean) => void;
}

export function Card({ cardCount, frontCard, drag, setActiveCardKey, children, onPress, edit, backgroundColor, isNfcActive, setIsNfcActive }: Readonly<CardProps>) {
    const [exitX, setExitX] = useState(0);
    const x = useMotionValue(0);
    const router = useRouter();
    const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
    const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
        clamp: false
    });

    const variantsFrontCard = {
        animate: { scale: 1, y: 0, opacity: 1 },
        exit: (custom: any) => ({
            x: custom,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 }
        })
    };

    const variantsBackCard = {
        animate: { scale: 0.75, y: 30, opacity: 0.5 }
    };

    function handleDragEnd(_: any, info: { offset: { x: number; }; }) {
        if (info.offset.x < -100) {
            setExitX(-250);
            setActiveCardKey(((prevKey: number) => (prevKey - 1 + cardCount) % cardCount) as unknown as number);
        }
        if (info.offset.x > 100) {
            setExitX(250);
            setActiveCardKey(((prevKey: number) => (prevKey + 1) % cardCount) as unknown as number);
        }
    }
    const { toggleSidebar } = useSidebar()
    return (
        <motion.div
            style={{
                x,
                rotate,
                cursor: "grab",
                position: "absolute",
                zIndex: frontCard ? 1 : 0,
            }}
            whileTap={{ cursor: "grabbing" }}
            drag={drag}
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            onDragEnd={handleDragEnd}
            variants={frontCard ? variantsFrontCard : variantsBackCard}
            animate="animate"
            exit="exit"
            custom={exitX}
            transition={
                frontCard
                    ? { type: "spring", stiffness: 300, damping: 20 }
                    : { scale: { duration: 0.2 }, opacity: { duration: 0.4 } }
            }
        >
            {isNfcActive && (
                <motion.div
                    className="absolute inset-0 z-0"
                    style={{
                        background: "radial-gradient(circle, rgba(0,255,237,1) 17%, rgba(213,255,0,1) 75%)",
                        borderRadius: "30px",
                    }}
                    animate={{
                        opacity: [0.6, 0.3, 0.6],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                />
            )}
            <motion.div
                style={{
                    width: 300,
                    height: 500,
                    borderRadius: 30,
                    scale,
                    backgroundColor: backgroundColor,
                    position: "relative",
                    zIndex: 1,
                }}
                onClick={onPress}
            >
                {children}
            </motion.div>
            {edit && (<motion.div className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 p-2 bg-gray-900 rounded-r-xl">
                <TooltipProvider>
                    <Tooltip >
                        <TooltipTrigger>
                            <Settings className="h-8 w-6" onClick={() => toggleSidebar()} />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Edit Styles</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </motion.div>)
            }
            {edit && (<motion.div className="absolute right-[-40px] top-1/3 transform -translate-y-1/2 p-2 bg-gray-900 rounded-r-xl">
                <TooltipProvider>
                    <Tooltip >
                        <TooltipTrigger>
                            <Nfc className="h-8 w-6" onClick={() => setIsNfcActive && handleNfcInteraction(setIsNfcActive, router)} />
                        </TooltipTrigger>
                        <TooltipContent side="right">
                            <p>Scan for Contacts</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </motion.div>)
            }
        </motion.div >
    );
}