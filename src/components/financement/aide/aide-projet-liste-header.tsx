export const AideProjetListeHeader = ({ title }: { title: string }) => {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
      <h1 className="max-w-3xl text-2xl">{title}</h1>
    </div>
  );
};
