export async function AltSRSantePopulationARisque({ id }: { id: string }) {
  return (
    <div id={id} className="sr-only">
      <strong>
        Augmentation de la population à risque en fonction de l'intensité de la chaleur (Source : Santé publique France)
      </strong>
      <p>
        Légende des niveaux d'acclimatation : Très mal acclimatée (risque fort), Partiellement acclimatée (risque
        modéré), Très bien acclimatée (risque faible).
      </p>

      <table>
        <thead>
          <tr>
            <th>Population</th>
            <th>Chaleur modérée</th>
            <th>Chaleur forte</th>
            <th>Chaleur intense</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Personnes sans-abri</td>
            <td>Très mal acclimatée</td>
            <td>Très mal acclimatée</td>
            <td>Très mal acclimatée</td>
          </tr>
          <tr>
            <td>Personnes fragiles (mauvaise santé, habitat surexposé à la chaleur)</td>
            <td>Très mal acclimatée</td>
            <td>Très mal acclimatée</td>
            <td>Très mal acclimatée</td>
          </tr>
          <tr>
            <td>Travailleurs surexposés à la chaleur</td>
            <td>Partiellement acclimatée</td>
            <td>Très mal acclimatée</td>
            <td>Très mal acclimatée</td>
          </tr>
          <tr>
            <td>Nourrissons et personnes âgées</td>
            <td>Partiellement acclimatée</td>
            <td>Très mal acclimatée</td>
            <td>Très mal acclimatée</td>
          </tr>
          <tr>
            <td>Adultes et enfants en bonne santé, passant beaucoup de temps à l'intérieur et plutôt sédentaires</td>
            <td>Très bien acclimatée</td>
            <td>Partiellement acclimatée</td>
            <td>Très mal acclimatée</td>
          </tr>
          <tr>
            <td>Adultes et enfants en bonne santé et pratiquant une activité physique régulière</td>
            <td>Très bien acclimatée</td>
            <td>Très bien acclimatée</td>
            <td>Partiellement acclimatée</td>
          </tr>
          <tr>
            <td>Adultes en très bonne santé et pratiquant une activité physique régulière et soutenue</td>
            <td>Très bien acclimatée</td>
            <td>Très bien acclimatée</td>
            <td>Très bien acclimatée</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export async function AltSRSanteVivreChaleurEnVille({ id }: { id: string }) {
  return (
    <div id={id} className="sr-only">
      <strong>Infographie : Mieux vivre avec la chaleur en ville (Santé publique France)</strong>

      <p>
        <strong>1. La chaleur est dangereuse pour la santé</strong>
      </p>
      <p>
        Pendant une canicule, l'épuisement de l'organisme se traduit par une très grande diversité d'effets sanitaires
        (symptômes cardiovasculaires, respiratoires, digestifs, rénaux, malaises, coups de chaleur, déshydratation...).
      </p>
      <p>
        Une pyramide illustre la relation entre la gravité des effets et la taille de la population touchée. De la base
        (population la plus large) au sommet (population la plus restreinte), on trouve : Symptômes sans prise en charge
        médicale, Consultations médicales, Passages aux urgences, Hospitalisations, et Mortalité.
      </p>
      <p>Chiffres clés entre 2014 et 2019 pendant les canicules :</p>
      <ul>
        <li>5 700 décès en France métropolitaine.</li>
        <li>5 200 passages aux urgences pour coups de chaleur, dont près de 1 500 enfants.</li>
        <li>5 900 passages aux urgences pour déshydratation, dont 3 500 personnes âgées.</li>
      </ul>

      <p>
        <strong>2. Les risques augmentent en fonction de l'environnement urbain</strong>
      </p>
      <p>
        Il fait plus chaud dans les zones plus denses et minéralisées. Le risque de mortalité est plus grand dans les
        communes qui ont le moins de végétation, d'arbres et des sols plus artificialisés.
      </p>
      <p>
        Un schéma illustre l'effet d'îlot de chaleur urbain, montrant qu'il fait de 2 à 6 degrés Celsius en plus dans
        les centres-villes denses par rapport aux zones de campagne végétalisées.
      </p>
      <p>
        Le risque de mortalité lié à la chaleur est 18 % plus grand dans les communes les moins arborées (selon une
        étude menée en Île-de-France).
      </p>

      <p>
        <strong>3. Vivre avec ce nouveau climat</strong>
      </p>
      <ul>
        <li>
          <strong>Réduire la chaleur en ville :</strong> végétalisation, désartificialisation des sols, choix des
          matériaux de construction...
        </li>
        <li>
          <strong>Adopter les bons réflexes en période de canicule :</strong> éviter les activités physiques intenses,
          fermer les volets et fenêtres le jour, aérer la nuit, boire de l'eau, se mouiller le corps, donner et prendre
          des nouvelles de ses proches...
        </li>
      </ul>
    </div>
  );
}
