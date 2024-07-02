import clsx from "clsx";

type PaginationProps = {
  count: number;
  defaultPage: number;
  onPageChange: (
    _page: number,
    _config?: {
      needScrollToTop?: boolean;
      nameId?: string | undefined;
    },
  ) => void;
};

export const Pagination = ({ count, defaultPage, onPageChange }: PaginationProps) => {
  const getPagination = (count: number, defaultPage: number) => {
    const maxVisiblePages = 7;
    const pages: { number: number | string; active: boolean }[] = [];
    const item = { number: "...", active: false };

    const addPage = (number: number) => pages.push({ number, active: defaultPage === number });

    if (count <= maxVisiblePages) {
      for (let i = 1; i <= count; i++) {
        addPage(i);
      }
      return pages;
    }

    if (defaultPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        addPage(i);
      }
      pages.push(item);
      addPage(count);
    } else if (defaultPage >= count - 3) {
      addPage(1);
      pages.push(item);
      for (let i = count - 4; i <= count; i++) {
        addPage(i);
      }
    } else {
      addPage(1);
      pages.push(item);
      for (let i = defaultPage - 1; i <= defaultPage + 1; i++) {
        addPage(i);
      }
      pages.push(item);
      addPage(count);
    }

    return pages;
  };

  const pages = getPagination(count, defaultPage);

  return (
    <div className={clsx("fr-grid-row")}>
      <div className={clsx("fr-mx-auto")}>
        <nav role="navigation" className={clsx("fr-pagination")} aria-label="Pagination">
          <ul className={clsx("fr-pagination__list")}>
            <li>
              <button
                className={clsx("fr-pagination__link !mb-0", "fr-pagination__link--first")}
                disabled={defaultPage === 1}
                onClick={() => onPageChange(1, { nameId: "financement-pagination" })}
              >
                Première page
              </button>
            </li>
            <li>
              <button
                className={clsx(
                  "fr-pagination__link !mb-0",
                  "fr-pagination__link--prev",
                  "fr-pagination__link--lg-label",
                )}
                disabled={defaultPage === 1}
                onClick={() => onPageChange(defaultPage! - 1, { nameId: "financement-pagination" })}
              >
                Page précédente
              </button>
            </li>
            {pages.map((p, index) => (
              <li key={index}>
                {p.number === "..." ? (
                  <span className={clsx("fr-pagination__link !mb-0")}>...</span>
                ) : (
                  <button
                    className={clsx("fr-pagination__link !mb-0", { "fr-pagination__link--active": p.active })}
                    disabled={p.active}
                    onClick={() => onPageChange(+p.number, { nameId: "financement-pagination" })}
                  >
                    {p.number}
                  </button>
                )}
              </li>
            ))}
            <li>
              <button
                className={clsx(
                  "fr-pagination__link !mb-0",
                  "fr-pagination__link--next",
                  "fr-pagination__link--lg-label",
                )}
                disabled={defaultPage === count}
                onClick={() => onPageChange(defaultPage! + 1, { nameId: "financement-pagination" })}
              >
                Page suivante
              </button>
            </li>
            <li>
              <button
                className={clsx("fr-pagination__link !mb-0", "fr-pagination__link--last")}
                disabled={defaultPage === count}
                onClick={() => onPageChange(count, { nameId: "financement-pagination" })}
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
