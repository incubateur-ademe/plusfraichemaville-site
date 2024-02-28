import { TableauDeBordCard } from "./tableau-de-bord-card";

export const TableauDeBordSuivi = () => {
  return (
    <div className="flex justify-between flex-wrap">
      <TableauDeBordCard progress="100" title="title">
        test
      </TableauDeBordCard>
      <TableauDeBordCard progress="50" title="title">
        test
      </TableauDeBordCard>
      <TableauDeBordCard progress="0" title="title">
        test
      </TableauDeBordCard>
      <TableauDeBordCard progress="50" title="title">
        test
      </TableauDeBordCard>
    </div>
  );
};
