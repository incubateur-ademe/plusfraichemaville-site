import { customCaptureException } from "@/src/lib/sentry/sentryCustomMessage";
import { EmailService } from "@/src/services/brevo";

const sendCsmEmails = async () => {
  try {
    if (process.env.SEND_CSM_EMAILS !== "true") {
      console.log("L'envoi de mail CSM est désactivé pour cet environnement'.");
    } else {
      await new EmailService().sendProjetCreationEmail();
    }
  } catch (error) {
    customCaptureException("Erreur lors du batch d'envoi des mails CSM.", error);
    process.exit(1);
  }
};

sendCsmEmails();
