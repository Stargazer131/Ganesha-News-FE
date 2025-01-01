import ReactPaginate from "react-paginate";

const Pagination = ({ handlePageClick, maxitem, forcePage }) => {
  const itemStyle =
    "bg-violet-400 hover:bg-violet-800 text-white font-bold py-2 px-4 rounded";
  const activeItemStyle =
    "bg-violet-800 text-white font-bold py-2 px-4 rounded";

  return (
    <ReactPaginate
      forcePage={forcePage}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={handlePageClick}
      pageCount={maxitem}
      renderOnZeroPageCount={null}
      containerClassName="flex gap-2 items-center justify-center mt-4"
      pageLinkClassName={itemStyle}
      activeLinkClassName={activeItemStyle}
      previousLinkClassName={itemStyle}
      nextLinkClassName={itemStyle}
      disabledLinkClassName="hidden"
      marginPagesDisplayed={1}
    />
  );
};

export default Pagination;
