/* eslint-disable max-len */
export const climadiagIndicateursData = {
  line: {
    jours_chauds: {
      title: "Nombre annuel de jours très chauds",
      indice: "35",
      picto: "climadiag-jour-tres-chaud",
      legend: {
        2030: [
          "Un jour est considéré comme très chaud si la température dépasse 35 °C au cours de la journée.",
          " Dans beaucoup de régions, les jours très chauds étaient relativement rares dans le climat récent. A l’horizon 2030, ce nombre de jours augmentera sensiblement induisant un accroissement des risques sanitaires.",
        ],
        2050: [
          "Un jour est considéré comme très chaud si la température dépasse 35 °C au cours de la journée.",
          "Dans beaucoup de régions, les jours très chauds étaient relativement rares dans le climat récent. A l’horizon 2050, ce nombre de jours augmentera fortement induisant un accroissement des risques sanitaires.",
        ],
        2100: [
          "Un jour est considéré comme très chaud si la température dépasse 35 °C au cours de la journée.",
          "Dans beaucoup de régions, les jours très chauds étaient relativement rares dans le climat récent. A l’horizon 2100, ce nombre de jours augmentera très fortement induisant un accroissement des risques sanitaires.",
        ],
      },
    },
    nuits_chaudes: {
      title: "Nombre annuel de nuits chaudes",
      indice: "20",
      picto: "climadiag-nuits-chaudes",
      legend: {
        2030: [
          "Une nuit est considérée comme chaude si la température durant cette nuit ne descend pas en dessous de 20 °C.",
          "D’ici l’horizon 2030, ces nuits deviendront sensiblement plus fréquentes dans de nombreuses régions. Dans les villes, souvent sujettes au phénomène d’îlot de chaleur urbain, l’accroissement du nombre de nuits chaudes exacerbera les problèmes sanitaires.",
        ],
        2050: [
          "Une nuit est considérée comme chaude si la température durant cette nuit ne descend pas en dessous de 20 °C.",
          "D’ici l’horizon 2050, ces nuits deviendront beaucoup plus fréquentes dans de nombreuses régions. Dans les villes, souvent sujettes au phénomène d’îlot de chaleur urbain, l’accroissement du nombre de nuits chaudes exacerbera les problèmes sanitaires.",
        ],
        2100: [
          "Une nuit est considérée comme chaude si la température durant cette nuit ne descend pas en dessous de 20 °C.",
          "D’ici l’horizon 2100, ces nuits deviendront beaucoup plus fréquentes dans toutes les régions. Dans les villes, souvent sujettes au phénomène d’îlot de chaleur urbain, l’accroissement du nombre de nuits chaudes exacerbera les problèmes sanitaires.",
        ],
      },
    },
    jours_vdc: {
      title: "Nombre annuel de jours en vague de chaleur",
      picto: "climadiag-jour-vdc",
      indice: null,
      legend: {
        2030: [
          "Un jour est considéré en vague de chaleur s’il s’inscrit dans un épisode, se produisant l’été, d’au moins cinq jours consécutifs pour lesquels la température maximale quotidienne excède la normale de plus de cinq degrés.",
          "L’augmentation du nombre de jours en vagues de chaleur est déjà perceptible et se poursuivra sur l’ensemble du pays d’ici l’horizon 2030.",
        ],
        2050: [
          "Un jour est considéré en vague de chaleur s’il s’inscrit dans un épisode, se produisant l’été, d’au moins cinq jours consécutifs pour lesquels la température maximale quotidienne excède la normale de plus de cinq degrés.",
          "L’augmentation du nombre de jours en vagues de chaleur est déjà perceptible et se poursuivra sur l’ensemble du pays d’ici l’horizon 2050.",
        ],
        2100: [
          "Un jour est considéré en vague de chaleur s’il s’inscrit dans un épisode, se produisant l’été, d’au moins cinq jours consécutifs pour lesquels la température maximale quotidienne excède la normale de plus de cinq degrés.",
          "L’augmentation du nombre de jours en vagues de chaleur est déjà perceptible et se poursuivra sur l’ensemble du pays d’ici l’horizon 2100.",
        ],
      },
    },
  },
  legend: [
    {
      label: "Période de référence (1976 - 2005)",
      color: "bg-dsfr-text-disabled-grey",
    },
    {
      label: "Valeur basse des projections climatiques autour de",
      color: "bg-pfmv-climadiag-yellow",
    },
    {
      label: "Valeur médiane des projections climatiques autour de",
      color: "bg-pfmv-climadiag-orange",
    },
    {
      label: "Valeur haute des projections climatiques autour de",
      color: "bg-pfmv-climadiag-red",
    },
  ],
};
