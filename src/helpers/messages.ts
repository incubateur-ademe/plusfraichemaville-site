export const success = {
  ESTIMATION_DELETE: "Votre estimation a bien été supprimée.",
  ESTIMATION_CREATED: "Votre estimation a bien été créée.",
  ESTIMATION_VALIDATED: "Votre estimation a bien été enregistrée.",
  ESTIMATION_UPDATED: "Votre estimation a bien été mise à jour.",
  ESTIMATION_AIDE_ADDED: "L'aide a bien été ajoutée à votre estimation.",
  ESTIMATION_AIDE_DELETED: "L'aide a bien été supprimée de votre estimation.",
  BOOKMARKED_SAVED_IN_DB: "Les fiches solutions ont bien été sauvegardées.",
  BOOKMARKED_DIAG_SAVED_IN_DB: "Les fiches diagnostic ont bien été sauvegardées.",
  FICHES_SOLUTIONS_ADDED_TO_PROJET: "Les fiches solutions ont bien été ajoutées au projet en cours.",
  AJOUT_FICHE_SOLUTION: "Les fiches diagnostic ont bien été ajoutées au projet en cours.",
  AJOUT_FICHE_DIAGNOSTIC: "La fiche diagnostic a bien été ajoutée au projet en cours.",
  PROJET_DELETE: "Votre projet a bien été supprimé.",
  PROJETS_LOADED: "Les projets ont été chargés.",
  PROJET_UPSERTED: "Les informations du projet ont bien été enregistrées.",
  USER_UPDATED: "Vos informations ont bien été enregistrées.",
  FICHE_SOLUTION_ADDED_TO_PROJET: "La fiche solution a bien été ajoutée au projet.",
  RECOMMANDATION_VIEWED_UPDATED: "Les recommandations vues ont été mises à jour.",
  EMAIL_SENT: "L'email a été envoyé.",
  ROLE_UPDATED: "Le nouveau rôle a bien été enregistré.",
  USER_DELETED_FROM_PROJECT: "Le membre a bien été supprimé du projet.",
  ACCEPT_INVITATION_PROJECT_ACCESS: "Vous avez rejoint le projet.",
  DECLINE_INVITATION_PROJECT_ACCESS: "Vous avez décliné l'invitation au projet.",
  ACCEPT_REQUEST_PROJECT_ACCESS: "Vous avez accepté la demande d'accès au projet.",
  DECLINE_REQUEST_PROJECT_ACCESS: "Vous avez refusé la demande d'accès au projet.",
  REQUEST_SENT: "Votre demande a bien été envoyée.",
  QUIT_PROJET: "Vous avez quitté le projet.",
  MATURITE_PROJET_UPDATED: "Le niveau de maturité de votre projet a été mis à jour.",
};

export const error = {
  ALREADY_SENT: "Une demande est déjà en cours pour ce projet.",
  ERROR_500: "Erreur de réponse du serveur. Merci de réessayer plus tard.",
  SERVICE_ERROR: "Une erreur s'est produite. Merci de réessayer ou de contacter notre support.",
  UNAUTHENTICATED: "Utilisateur non authentifié.",
  INVITATION_RESEND_DELAY_TOO_SHORT: "Veuillez attendre 10 minutes avant de renvoyer une invitation.",
  UNAUTHORIZED: "Vous ne disposez pas des droits nécessaires pour cette opération.",
  ESTIMATION_DELETE_UNAUTHORIZED: "Vous n'avez pas les droits de suppression sur cette estimation.",
  ESTIMATION_DOESNT_EXIST: "L'estimation n'existe pas.",
  PROJET_DELETE_UNAUTHORIZED: "Vous n'avez pas les droits de suppression sur ce projet.",
  PROJET_UPDATE_UNAUTHORIZED: "Vous n'avez pas les droits de modification sur ce projet.",
  PARSING_ERROR: "Erreur de validation des données envoyées.",
  TECHNICAL_ERROR: "Erreur technique, veuillez réessayer plus tard.",
  CHANGE_COLLECTIVITE_ERROR: "Erreur technique, veuillez réessayer plus tard.",
  PROJET_MUST_HAVE_ONE_ADMIN: "Vous ne pouvez pas quitter le projet car vous êtes le seul administrateur du projet.",
  USER_ALREADY_IN_PROJET: "Cet utilisateur a déjà accès au projet.",
  REQUEST_ALREADY_IN_PROJET: "Vous avez déjà accès au projet.",
  REQUEST_ALREADY_INVITED:
    "Vous avez été invité sur ce projet, vous pouvez accepter l'invitation dans l'onglet \"Invitations\".",
  REQUEST_ALREADY_SENT: "Vous avez déjà envoyé une demande d'accès sur ce projet.",
  USER_ALREADY_INVITED_IN_PROJET: "Cet utilisateur a déjà été invité à rejoindre le projet.",
  USER_ALREADY_REQUESTED_ACCESS_TO_PROJET: "Cet utilisateur a déjà demandé l'accès au projet.",
  INVITATION_NOT_FOUND: "Ce lien d'invitation a déjà été utilisé ou n'est pas valide.",
  INVITATION_NOT_FOR_EMAIL: "Cette invitation ne correspond pas à votre email.",
};