import { CardData, Tag } from "@/app/page";
import { Badge } from "@/components/ui/badge";
import { greatVibes, sourceCodePro400 } from "@/styles/fonts";
import { IconGlobe, IconPhone, IconShare } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform
} from "framer-motion";
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import EmptyCard from "../empty-card";
import Link from "next/link";


interface CardProps {
  cardCount: number;
  frontCard: boolean;
  drag: boolean | "x" | "y";
  setActiveCardKey: (key: number) => void;
  children: React.ReactNode;
  onPress: () => void;
}

export function Card({ cardCount, frontCard, drag, setActiveCardKey, children, onPress }: Readonly<CardProps>) {
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

  return (
    <motion.div
      style={{
        x,
        rotate,
        cursor: "grab",
        position: "absolute",
        zIndex: frontCard ? 1 : 0
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
          backgroundColor: "#000",
          borderRadius: 30,
          scale
        }}
        onClick={onPress}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

interface GlareCardProps {
  cards: CardData[];
  activeCardId: any;
}

export function GlareCard({ cards, activeCardId }: Readonly<GlareCardProps>) {
  const [activeCardKey, setActiveCardKey] = useState(0);

  useEffect(() => {
    console.log("activeCardId", activeCardId, cards);
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
              >
                <div key={i} className="p-4 flex flex-col">
                  <div className="flex flex-row justify-between">
                    <h2 className={`mb-2 text-3xl font-semibold ${sourceCodePro400.className} ${!card.info_visibility.includes('name') && "blur-md"}`}>{
                      card.info_visibility.includes('name') ? card.name : "You Sneaky"
                    }</h2>
                    {card.shareception && card.info_visibility.length >= 0 && (
                      <IconShare className="text-4xl" onClick={() => {
                        if (card.info_visibility.length === 0) {
                          enqueueSnackbar("Please enable some info to share", { variant: "error", preventDuplicate: true });
                        }
                        else {
                          navigator.clipboard.writeText(window.location.href + `share?id=${card?.shareslug}`);
                          enqueueSnackbar("Link copied to clipboard", { variant: "success", preventDuplicate: true });
                        }
                      }} />
                    )}
                  </div>
                  <p className={`text-2xl mb-2 ${greatVibes.className}  ${!card.info_visibility.includes('title') && "blur-md"}`}>{card.info_visibility.includes('title') ? card.title : "Why you lookin at this"}</p>
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
