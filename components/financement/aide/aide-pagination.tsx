import { useState } from "react";
import { Pagination, PaginationProps } from "@codegouvfr/react-dsfr/Pagination";

const MyComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10; // exemple, à ajuster selon vos besoins

  const getPageLinkProps = (pageNumber: number) => {
    return {
      href: `#page-${pageNumber}`,
      onClick: (e: any) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
        // Logique supplémentaire pour gérer le changement de page
      },
    };
  };

  const paginationProps: PaginationProps = {
    count: totalPages,
    defaultPage: currentPage,
    getPageLinkProps,
    showFirstLast: true, // Afficher les liens vers la première et la dernière page
  };

  return (
    <div>
      <Pagination {...paginationProps} />
    </div>
  );
};

export default MyComponent;
