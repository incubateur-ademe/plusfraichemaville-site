"use client";
import Image from "next/image";
import { AiChat, AiChatUI, useAsBatchAdapter } from "@nlux/react";
import { sentChatMessageAction } from "@/actions/agentConversationnel/sendChatMessageAction";
import "@nlux/themes/nova.css";
import { useState } from "react";
import "./agent.color.css";
import clsx from "clsx";

export default function Agent() {
  const [conversationId, setConversationId] = useState<string | null>(null);

  const nluxCustomAdapter = useAsBatchAdapter(async (message: string): Promise<string> => {
    const result = await sentChatMessageAction(message, conversationId);
    setConversationId(result.conversationId);
    return result.messageResponse;
  });

  return (
    <div className={clsx("agent-popover", "fixed bottom-10 right-10 z-[1000] h-[80%] max-h-[30rem] w-96 text-sm")}>
      <AiChat
        adapter={nluxCustomAdapter}
        displayOptions={{ themeId: "nova", colorScheme: "light" }}
        personaOptions={{
          assistant: { name: "Zéphyr", avatar: "/images/zephyr/zephyr.png" },
          user: {
            name: "Vous",
            avatar: <Image src={"/images/auth/user.svg"} width={32} height={32} alt="" />,
          },
        }}
      >
        <AiChatUI.Greeting>
          <div className="flex flex-col items-center">
            <Image src={"/images/zephyr/zephyr.png"} width={32} height={32} alt="" />
            <div className="m-5 rounded-2xl bg-dsfr-background-alt-blue-france p-4">
              Bonjour, je suis Zéphyr, votre assistant virtuel. Posez-moi vos questions en utilisant des mots simples.
            </div>
          </div>
        </AiChatUI.Greeting>
      </AiChat>
    </div>
  );
}
