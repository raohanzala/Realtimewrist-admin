import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { ShopContext } from "../contexts/ShopContext";
import { PAGE_SIZE } from "../utils/constants";

function Pagination( {pageCount, fectchData, totalData}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    fectchData(currentPage, PAGE_SIZE);
  }, [currentPage, fectchData]);

  function nextPage() {
    if (currentPage < pageCount) {
      searchParams.set("page", currentPage + 1);
      setSearchParams(searchParams);
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      searchParams.set("page", currentPage - 1);
      setSearchParams(searchParams);
    }
  }

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-between items-center py-3 px-3 bg-[#f2f2f2af] text-[#525252] text-sm">
      <p>
        Showing{" "}
        <span className="font-semibold">{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span className="font-semibold">
          {currentPage === pageCount
            ? totalData
            : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{totalData}</span> results
      </p>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="pr-3 pl-2 flex items-center gap-1 py-1 hover:bg-primary-1 hover:text-white rounded disabled:opacity-50"
        >
          <HiChevronLeft />
          Previous
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === pageCount}
          className="pl-3 pr-2 py-1 flex items-center gap-1 hover:bg-primary-1 disabled:bg-none disabled:cursor-not-allowed hover:text-white rounded disabled:opacity-50"
        >
          Next
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
