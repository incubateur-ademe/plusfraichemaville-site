import Image from "next/image";

export const AgentGreeting = () => (
  <div className="flex flex-col items-center">
    <Image src={"/images/zephyr/zephyr.png"} width={32} height={32} alt="" />
    <div className="m-5 rounded-2xl bg-dsfr-background-alt-blue-france p-4">
      Bonjour, je suis Zéphyr, votre assistant virtuel. Posez-moi vos questions en utilisant des mots simples.
    </div>
  </div>
);
