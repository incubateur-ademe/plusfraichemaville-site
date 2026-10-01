export const sanitizeUrlForAnalyticTool = (url: string) => {
  const splittedUrl = url.split("/espace-projet/");
  const espaceProjetSubstring = splittedUrl[1];
  if (!espaceProjetSubstring) {
    return url;
  }
  const projetId = espaceProjetSubstring.split("/")[0];
  const urlWithoutProjetId = !isNaN(+projetId) ? url.replace(projetId, "[projetId]") : url;
  const financementId = urlWithoutProjetId.split("/")[5];
  return !isNaN(+financementId) ? urlWithoutProjetId.replace(financementId, "[financementId]") : urlWithoutProjetId;
};

export const UPDATE_PROJET_CONTEXT_ACTIONS = {
  CREATION_PROJET: "Création du projet",
  UPDATE_PROJET_ATTRIBUTE: "Modification d'un attribut du projet",
  DIAG_SIMPLIFIE: "Diagnostic simplifié",
  ADD_FICHE_DIAGNOSTIC: "Ajout fiche diagnostic",
  REMOVE_FICHE_DIAGNOSTIC: "Retrait fiche diagnostic",
  ADD_FICHE_SOLUTION: "Ajout fiche solution",
  REMOVE_FICHE_SOLUTION: "Retrait fiche solution",
  CREATE_ESTIMATION: "Création d'une estimation",
  UPDATE_ESTIMATION: "Mise à jour d'une estimation",
  DELETE_ESTIMATION: "Suppression d'une estimation",
  ADD_AIDE: "Ajout d'une aide",
  REMOVE_AIDE: "Retrait d'une aide",
  DELETE_PROJET: "Suppression du projet",
  ADD_CONTACT: "Ajout d'un contact",
  REMOVE_CONTACT: "Suppression d'un contact",
  ADD_UTILISATEUR: "Ajout d'un utilisateur",
  REMOVE_UTILISATEUR: "Suppression d'un utilisateur",
};
