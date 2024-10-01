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
