export const AideEstimationsListeHeader = ({ title }: { title: string }) => {
  return (
    <div className="mb-10 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <h1 className="mb-0 max-w-3xl text-[28px] font-bold leading-9">{title}</h1>
    </div>
  );
};
