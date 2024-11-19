import styles from "./pagination.module.css";

type PaginationProps = {
  visiblePages: (number | string)[];
  currentPage: number;
  onPageClick: (page: number) => void;
  onNextClick: () => void;
  onPreviousClick: () => void;
  isNextDisabled: boolean;
  isPreviousDisabled: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  visiblePages,
  currentPage,
  onPageClick,
  onNextClick,
  onPreviousClick,
  isNextDisabled,
  isPreviousDisabled
}) => (
  <div className={styles.paginationContainer}>
    <button
      onClick={onPreviousClick}
      disabled={isPreviousDisabled}
      className={`${styles.arrowButton} ${
        isPreviousDisabled ? styles.disabledButton : ""
      }`}
    >
      &lt;
    </button>

    <div className={styles.paginationButtons}>
      {visiblePages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageClick(page)}
            className={`${styles.paginationButton} ${
              page === currentPage ? styles.activePage : ""
            }`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className={styles.paginationEllipsis}>
            {page}
          </span>
        )
      )}
    </div>

    <button
      onClick={onNextClick}
      disabled={isNextDisabled}
      className={`${styles.arrowButton} ${
        isNextDisabled ? styles.disabledButton : ""
      }`}
    >
      &gt;
    </button>
  </div>
);

export { Pagination };
