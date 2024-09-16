import Image from "next/image";

export const AgentLoader = () => {
  return (
    <div>
      <Image src={"/images/zephyr/zephyr.png"} width={24} height={24} className="animate-spin ease-in" alt="" />
    </div>
  );
};
