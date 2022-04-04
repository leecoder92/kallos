import React, {useState} from 'react';
import Pagination from "react-js-pagination";
import styles from '../styles/Pagination.module.css';

export interface ReactJsPaginationProps {
  activePage: number;
  itemsCountPerPage?: number | undefined;
  totalItemsCount: number;
  pageRangeDisplayed?: number | undefined;
  prevPageText?: string| React.ReactElement | undefined;
  nextPageText?: string | React.ReactElement | undefined;
}

// totalCount : 총 아이템의 갯수(totalItemsCount), curPage : 현재 페이지
// numPerPage : 한 페이지당 아이템 갯수
const Paging = ({ curPage, totalItems, itemsPerPage, setCurPage}) => {

  const handlePageChange = (curPage) => {
    setCurPage(curPage)
  }

  return (
    <div className={styles.container}>
      <Pagination
        activePage={curPage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={totalItems}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default Paging;