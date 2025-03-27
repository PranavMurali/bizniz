import { CardData, Tag } from "@/app/page";
import { Badge } from "@/components/ui/badge";
import {
  useSidebar
} from "@/components/ui/sidebar";
import { greatVibes, sourceCodePro400 } from "@/styles/fonts";
import { IconGlobe, IconPhone, IconShare } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform
} from "framer-motion";
import { Settings } from "lucide-react";
import Link from "next/link";
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import BusinessCardEditor from "../card-editor";
import EmptyCard from "../empty-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface CardProps {
  cardCount: number;
  frontCard: boolean;
  drag: boolean | "x" | "y";
  setActiveCardKey: (key: number) => void;
  children: React.ReactNode;
  onPress: () => void;
  edit?: boolean;
  backgroundColor: string;
}

export function Card({ cardCount, frontCard, drag, setActiveCardKey, children, onPress, edit, backgroundColor }: Readonly<CardProps>) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
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
      <motion.div
        style={{
          width: 300,
          height: 500,
          borderRadius: 30,
          scale,
          backgroundColor: backgroundColor,
        }}
        onClick={onPress}
      >
        {children}
      </motion.div>
      {edit && (<motion.div className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 p-2 bg-gray-900 rounded-r-xl">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Settings className="h-8 w-6" onClick={() => toggleSidebar()} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Styles</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>)
      }
    </motion.div >
  );
}

interface GlareCardProps {
  cards: CardData[];
  activeCardId: any;
}

export function GlareCard({ cards, activeCardId }: Readonly<GlareCardProps>) {
  const [activeCardKey, setActiveCardKey] = useState(0);

  useEffect(() => {
    const scrollToCard = (id: any) => {
      const cardIndex = cards.findIndex((card: { id: any; }) => card.id === id);
      if (cardIndex !== -1) {
        setActiveCardKey(cardIndex);
      }
    };
    scrollToCard(activeCardId);
  }, [activeCardId, cards]);

  return (
    <motion.div style={{ width: 300, height: 500, position: "relative" }} className="justify-center align-middle content-center mx-auto flex">
      <AnimatePresence initial={false}>
        <BusinessCardEditor />
        {cards.length === 0 ? (
          <EmptyCard />
        ) : (
          <>
            {cards.map((card, i) => (
              <Card
                key={i}
                cardCount={cards.length}
                frontCard={i === activeCardKey}
                setActiveCardKey={setActiveCardKey}
                drag="x"
                onPress={() => setActiveCardKey(Number(i))}
                edit={card?.edit || false}
                backgroundColor={card?.styles?.backgroundColor || "#000000"}
              >
                <div className={`p-4 flex flex-col `}>
                  <div className="flex flex-row justify-between">
                    <h2
                      style={{ color: card?.styles?.textColor }}
                      className={`mb-2 text-3xl font-semibold ${sourceCodePro400.className} ${!card.info_visibility.includes('name') && "blur-md"}`}>{
                        card.info_visibility.includes('name') ? card.name : "You Sneaky"
                      }</h2>
                    {card.shareception && card.info_visibility.length >= 0 && (
                      <IconShare className="text-4xl"
                        onClick={() => {
                          if (card.info_visibility.length === 0) {
                            enqueueSnackbar("Please enable some info to share", { variant: "error", preventDuplicate: true, autoHideDuration:2000 });
                          }
                          else {
                            navigator.clipboard.writeText(window.location.href + `share?id=${card?.shareslug}`);
                            enqueueSnackbar("Link copied to clipboard", { variant: "success", preventDuplicate: true, autoHideDuration:2000 });
                          }
                        }} />
                    )}
                  </div>
                  <p
                    style={{ color: card.styles?.secondaryTextColor }}
                    className={`text-2xl mb-2 ${greatVibes.className}  ${!card.info_visibility.includes('title') && "blur-md"}`}>{card.info_visibility.includes('title') ? card.title : "Why you lookin at this"}</p>
                  <p className={`mb-2 text-xl underline ${!card.info_visibility.includes('email') && "blur-md"}`}>{card.info_visibility.includes('email') ? card.email : "Inspector 🔍"}</p>
                  <div className={`flex flex-row gap-2 mt-2 ${!card.info_visibility.includes('phone') && "blur-md"}`}>
                    <IconPhone className="text-4xl" />
                    <p className="text-gray-600 text-xl">{card.info_visibility.includes('phone') ? card.phone : "911"}</p>
                  </div>
                  {card.info_visibility.includes('address') ? (
                    <p className="mt-5">{card.address}</p>) : (null)}
                  <p>{card.info_visibility.length === 0 ? "No information available right now" : null}</p>
                  {card.info_visibility.includes('website') ? (
                    <Link href={card.website || ""} passHref>
                      <IconGlobe
                        className="flex bottom-20 absolute"
                      />
                    </Link>) : (null)}
                  < div className={`flex bottom-10 absolute gap-2 flex-col ${!card.info_visibility.includes('tags') && "blur-md"}`}>
                    <div>
                      {card.info_visibility.includes('tags') ? (
                        <div>
                          {card.tags.map((tag: Tag) => (
                            <Badge key={tag.id} variant="outline" className="text-sm">{tag.text}</Badge>
                          ))}
                        </div>
                      ) : (
                        <Badge key={"911"} variant="outline" className="text-sm">no</Badge>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div >
  );
}
