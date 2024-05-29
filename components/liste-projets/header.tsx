import { ListProjetsHeaderEmpty } from "./empty";

export const ListeProjetsHeader = ({ isListEmpty }: { isListEmpty: boolean }) => {
  return (
    <>
      <div className="pb-4 flex justify-between">
        <div className="w-full">
          <h2 className="text-dsfr-text-label-blue-france text-2xl mb-1">Mon espace projet</h2>
          <span className="text-lg block mb-8">Les projets de rafraîchissement de ma collectivité</span>
          {isListEmpty && <ListProjetsHeaderEmpty />}
        </div>
      </div>
    </>
  );
};
