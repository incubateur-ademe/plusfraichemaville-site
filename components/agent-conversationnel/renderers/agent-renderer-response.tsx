import { ResponseRenderer } from "@nlux/react";
import Markdown from "react-markdown";
import Link from "next/link";

export const AgentResponseRenderer: ResponseRenderer<string> = (props) => {
  return (
    <Markdown
      className="rounded-2xl rounded-bl-none bg-dsfr-background-contrast-blue-france p-3 [&_>_p]:mb-0"
      // eslint-disable-next-line react/no-children-prop
      children={props.content.toString()}
      components={{
        a: ({ href = "", children }) => {
          return href.startsWith("/") ? (
            <Link href={href}>{children}</Link>
          ) : (
            <a href={href} target="_blank" rel="noreferrer">
              {children}
            </a>
          );
        },
      }}
    />
  );
};
