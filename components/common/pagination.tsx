import { fr } from "@codegouvfr/react-dsfr";

type PaginationProps = {
  count: number;
  defaultPage: number;
  onPageChange: (_page: number) => void;
};

export const Pagination = ({ count, defaultPage, onPageChange }: PaginationProps) => {
  const getPagination = (count: number, defaultPage: number) => {
    const maxVisiblePages = 10;
    if (count <= maxVisiblePages) {
      return Array.from({ length: count }, (_, v) => ({
        number: v + 1,
        active: defaultPage === v + 1,
      }));
    }

    if (defaultPage > count - maxVisiblePages) {
      return Array.from({ length: maxVisiblePages }, (_, v) => {
        const pageNumber = count - (maxVisiblePages - v) + 1;
        return {
          number: pageNumber,
          active: defaultPage === pageNumber,
        };
      });
    }
    return [];
  };

  const pages = getPagination(count, defaultPage!);

  return (
    <div className={fr.cx("fr-grid-row", "fr-mt-5w")}>
      <div className={fr.cx("fr-mx-auto")}>
        <nav role="navigation" className={fr.cx("fr-pagination")} aria-label="Pagination">
          <ul className={fr.cx("fr-pagination__list")}>
            <li>
              <button
                className={fr.cx("fr-pagination__link", "fr-pagination__link--first")}
                disabled={defaultPage === 1}
                onClick={() => onPageChange(1)}
              >
                Première page
              </button>
            </li>
            <li>
              <button
                className={fr.cx("fr-pagination__link", "fr-pagination__link--prev", "fr-pagination__link--lg-label")}
                disabled={defaultPage === 1}
                onClick={() => onPageChange(defaultPage! - 1)}
              >
                Page précédente
              </button>
            </li>
            {pages.map((p) => (
              <li key={p.number}>
                <button
                  className={fr.cx("fr-pagination__link")}
                  disabled={p.active}
                  onClick={() => onPageChange(p.number)}
                >
                  {p.number}
                </button>
              </li>
            ))}
            <li>
              <button
                className={fr.cx("fr-pagination__link", "fr-pagination__link--next", "fr-pagination__link--lg-label")}
                disabled={defaultPage === count}
                onClick={() => onPageChange(defaultPage! + 1)}
              >
                Page suivante
              </button>
            </li>
            <li>
              <button
                className={fr.cx("fr-pagination__link", "fr-pagination__link--last")}
                disabled={defaultPage === count}
                onClick={() => onPageChange(count)}
              >
                Dernière page
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
