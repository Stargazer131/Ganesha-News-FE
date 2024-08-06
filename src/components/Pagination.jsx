import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, maxitem }) => {
  const itemStyle =
    "bg-violet-400 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded";
  const activeItemStyle =
    "bg-violet-800 text-white font-bold py-2 px-4 rounded";

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageCount={maxitem}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="flex gap-2 items-center justify-center mt-4" // Add container styles
      pageLinkClassName={itemStyle}
      activeLinkClassName={activeItemStyle}
      previousLinkClassName={itemStyle}
      nextLinkClassName={itemStyle}
      disabledLinkClassName="hidden"
    />
  );
};

export default Pagination;
