import { useModalStore } from "@/stores/modal/provider";
import Image from "next/image";

export const LecteurModeLabel = () => {
  const setDiscardViewerMode = useModalStore((state) => state.setCurrentDiscardViewerMode);
  const openModal = () => setDiscardViewerMode(true);

  return (
    <button onClick={openModal} className="flex items-center justify-center gap-3 hover:!bg-white">
      <Image src="/images/espace-projet/viewer-mode.svg" width={46} height={35} alt="" />
      <strong className="text-black">Mode lecteur</strong>
    </button>
  );
};