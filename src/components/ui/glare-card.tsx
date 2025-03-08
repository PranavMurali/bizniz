import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  AnimatePresence
} from "framer-motion";
import { sourceCodePro400 } from "@/styles/fonts";
import { IconBrandBehance, IconBrandGithub, IconBrandLinkedin, IconBrandTwitter, IconBrandWhatsapp } from "@tabler/icons-react";
import EmptyCard from "../empty-card";
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function Card({ cardCount, frontCard, drag, setActiveCardKey, children, onPress }) {
  const [exitX, setExitX] = useState(0);
  const x = useMotionValue(0);
  const scale = useTransform(x, [-150, 0, 150], [0.5, 1, 0.5]);
  const rotate = useTransform(x, [-150, 0, 150], [-45, 0, 45], {
    clamp: false
  });

  const variantsFrontCard = {
    animate: { scale: 1, y: 0, opacity: 1 },
    exit: (custom) => ({
      x: custom,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.2 }
    })
  };
  const variantsBackCard = {
    animate: { scale: 0.75, y: 30, opacity: 0.5 }
  };

  function handleDragEnd(_, info) {
    if (info.offset.x < -100) {
      setExitX(-250);
      setActiveCardKey((prevKey) => (prevKey - 1 + cardCount) % cardCount);
    }
    if (info.offset.x > 100) {
      setExitX(250);
      setActiveCardKey((prevKey) => (prevKey + 1) % cardCount);
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

export function GlareCard({ cards, activeCardId }) {
  const [activeCardKey, setActiveCardKey] = useState(0);

  useEffect(() => {
    const scrollToCard = (id) => {
      const cardIndex = cards.findIndex(card => card.id === id);
      if (cardIndex !== -1) {
        setActiveCardKey(cardIndex);
      }
    };
    scrollToCard(activeCardId);
  }, [activeCardId]);



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
                onPress={() => setActiveCardKey(i)}
              >
                {console.log("carda", card, i)}
                <div key={card.key} className="p-4 flex flex-col">
                  <h2 className={`text-3xl ${sourceCodePro400.className}`}>{card.title}</h2>
                  <p className="text-gray-700 mb-2 text-3xl font-semibold">{card.name}</p>
                  <p className="text-gray-600 mb-2 text-xl italic">{card.position}</p>
                  <p className="text-gray-600 mb-2 text-xl underline">{card.email}</p>
                  <p className="text-gray-600 text-xl">{card.phone}</p>
                  <div className="flex flex-row justify-space-between ">
                    <IconBrandWhatsapp className="text-4xl" onClick={
                      () => {
                        navigator.clipboard.writeText(window.location.href + `share?id=${card?.shareslug}`);
                      }
                    } />
                    {/* <IconBrandLinkedin className="text-4xl" /> */}
                    {/* <IconBrandGithub className="text-4xl" /> */}
                    {/* <IconBrandBehance className="text-4xl" /> */}
                    {/* <IconBrandTwitter className="text-4xl" /> */}
                  </div>
                  <div className="flex bottom-10 absolute gap-2 flex-col">
                    <div>
                      {
                        card.tags.map(({ text, id }: { text: string, id: number }) => (
                          <Badge key={id} variant="outline" className="text-sm">{text}</Badge>
                        ))
                      }
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
