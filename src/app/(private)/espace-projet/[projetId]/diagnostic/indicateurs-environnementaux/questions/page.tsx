export default async function IndicateursEnvironnementauxPresentationPage() {
  return (
    <div className="fr-container pt-8 text-black">
      <h1 className="mb-6 text-2xl font-bold">
        Je calcule les indicateurs environnementaux de mon espace à l’état initial
      </h1>
      <div className={"mb-12 text-lg"}>
        {"Les indicateurs environnementaux sont des valeurs simplifiées et relatives. Ils offrent une première " +
          "compréhension de l’lecture climatique d’un espace à rafraîchir et permettent d’analyser les impacts " +
          "théoriques de différents scénarios. Pour un diagnostic plus poussé de la surchauffe urbaine, " +
          "l’accompagnement d’un bureau d’études est recommandé."}
      </div>
    </div>
  );
}
