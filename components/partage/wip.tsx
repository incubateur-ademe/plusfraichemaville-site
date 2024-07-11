"use client";

import { sendInvitationAction } from "@/actions/emails/send-invitation-email-action";
import { FormEvent } from "react";

interface ProjectInvitationProps {
  projectName: string;
}

export default function ProjectInvitation({ projectName }: ProjectInvitationProps) {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await sendInvitationAction("med.louraoui@gmail.com", projectName);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <button type="submit">envoyer</button>
    </form>
  );
}
