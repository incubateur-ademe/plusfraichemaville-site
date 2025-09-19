import { NextRequest, NextResponse } from "next/server";
import Fuse from "fuse.js";
import { getSearchableRetoursExperiences } from "@/src/lib/strapi/queries/retoursExperienceQueries";
import { getRetoursExperiencesDiag } from "@/src/lib/strapi/queries/retour-experience-diag-queries";
import { getAllFichesSolutions } from "@/src/lib/strapi/queries/fichesSolutionsQueries";
import { getAllFichesDiagnostic } from "@/src/lib/strapi/queries/fiches-diagnostic-queries";
import {
  mapFicheDiagnosticToSearchableFD,
  mapFicheSolutionToSearchableFS,
  mapRexDiagToSearchableRexDiag,
  mapRexToSearchableRex,
  mapWebinaireToSearchableWebinaire,
  normalizeText,
  SEARCH_KEYS_FICHE_DIAGNOSTIC,
  SEARCH_KEYS_FICHE_SOLUTION,
  SEARCH_KEYS_REX,
  SEARCH_KEYS_REX_DIAGNOSTIC,
  SEARCH_KEYS_WEBINAIRES,
} from "@/src/components/recherche/recherche-helpers";
import { SearchResult } from "@/src/components/recherche/recherche-types";
import { getAllWebinaires } from "@/src/lib/strapi/queries/webinaires-queries";

export async function GET(request: NextRequest) {
  const searchText = request.nextUrl.searchParams.get("q");
  const limit = +(request.nextUrl.searchParams.get("limit") || 15);
  if (!searchText || limit <= 0 || limit > 20) {
    return NextResponse.json([], { status: 400 });
  }
  const normalizedSearchText = normalizeText(searchText);

  const retoursExperience = (await getSearchableRetoursExperiences()).map(mapRexToSearchableRex);
  const retoursExperienceDiagnostic = (await getRetoursExperiencesDiag()).map(mapRexDiagToSearchableRexDiag);
  const fichesSolution = (await getAllFichesSolutions()).map((fs) => mapFicheSolutionToSearchableFS(fs));
  const fichesDiagnostic = (await getAllFichesDiagnostic()).map(mapFicheDiagnosticToSearchableFD);
  const webinaires = (await getAllWebinaires()).map(mapWebinaireToSearchableWebinaire);

  const fuseOptions = {
    ignoreDiacritics: true,
    threshold: 0.3,
    distance: 1000,
    useExtendedSearch: true,
  };

  const fuseOptionsLargeText = {
    ignoreDiacritics: true,
    threshold: 0.3,
    distance: 100000,
    useExtendedSearch: true,
  };
  const fuseFichesSolution = new Fuse(fichesSolution, { ...fuseOptions, keys: SEARCH_KEYS_FICHE_SOLUTION });
  const fuseRex = new Fuse(retoursExperience, { ...fuseOptionsLargeText, keys: SEARCH_KEYS_REX });
  const fuseFichesDiagnostic = new Fuse(fichesDiagnostic, { ...fuseOptions, keys: SEARCH_KEYS_FICHE_DIAGNOSTIC });
  const fuseRexDiagnostic = new Fuse(retoursExperienceDiagnostic, { ...fuseOptions, keys: SEARCH_KEYS_REX_DIAGNOSTIC });
  const fuseWebinaires = new Fuse(webinaires, { ...fuseOptions, keys: SEARCH_KEYS_WEBINAIRES });
  const ficheSolutionResults = fuseFichesSolution.search(normalizedSearchText);
  const rexResults = fuseRex.search(normalizedSearchText);
  const ficheDiagnosticResults = fuseFichesDiagnostic.search(normalizedSearchText);
  const rexDiagnosticResults = fuseRexDiagnostic.search(normalizedSearchText);
  const webinaireResults = fuseWebinaires.search(normalizedSearchText);
  const results: SearchResult = {
    fichesSolutions: ficheSolutionResults.map((r) => r.item),
    retoursExperience: rexResults.map((r) => r.item),
    ficheDiagnostics: ficheDiagnosticResults.map((r) => r.item),
    retoursExperienceDiagnostic: rexDiagnosticResults.map((r) => r.item),
    webinaires: webinaireResults.map((r) => r.item),
  };

  return NextResponse.json(results);
}
