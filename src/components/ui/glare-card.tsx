import { CardData, Tag } from "@/app/page";
import { Badge } from "@/components/ui/badge";
import { greatVibes, sourceCodePro400 } from "@/styles/fonts";
import { IconGlobe, IconNfc, IconPhone, IconShare } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion
} from "framer-motion";
import Link from "next/link";
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from "react";
import BusinessCardEditor from "../card-editor";
import EmptyCard from "../empty-card";
import { handleNfcShare } from "@/lib/nfc";
import { Card } from "./contact-card";

interface GlareCardProps {
  cards: CardData[];
  activeCardId: any;
}

export function GlareCard({ cards, activeCardId }: Readonly<GlareCardProps>) {
  const [activeCardKey, setActiveCardKey] = useState(0);
  const [isNfcActive, setIsNfcActive] = useState(false);

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
                isNfcActive={isNfcActive}
                setIsNfcActive={setIsNfcActive}
              >
                <div className={`p-4 flex flex-col`}>
                  <div className="flex flex-row justify-between">
                    <h2
                      style={{ color: card?.styles?.textColor }}
                      className={`mb-2 text-3xl font-semibold ${sourceCodePro400.className} ${!card.info_visibility.includes('name') && "blur-md"}`}>{
                        card.info_visibility.includes('name') ? card.name : "You Sneaky"
                      }</h2>
                    <div className="flex flex-row gap-2">
                      {card.shareception && card.info_visibility.length >= 0 && (
                        <>
                          <IconShare className="text-4xl"
                            onClick={() => {
                              if (card.info_visibility.length === 0) {
                                enqueueSnackbar("Please enable some info to share", { variant: "error", preventDuplicate: true, autoHideDuration: 2000 });
                              }
                              else {
                                const shareUrl = window.location.href + `share?id=${card?.shareslug}`;
                                navigator.clipboard.writeText(shareUrl);
                                enqueueSnackbar("Link copied to clipboard", { variant: "success", preventDuplicate: true, autoHideDuration: 2000 });
                              }
                            }} />
                          <IconNfc className="text-4xl"
                            onClick={() => {
                              if (card.info_visibility.length === 0) {
                                enqueueSnackbar("Please enable some info to share via NFC", { variant: "error", preventDuplicate: true, autoHideDuration: 2000 });
                              }
                              else {
                                const shareUrl = window.location.href + `share?id=${card?.shareslug}`;
                                handleNfcShare(shareUrl);
                              }
                            }} />
                        </>
                      )}
                    </div>
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
