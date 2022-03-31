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

const Paging = ({ page, count, setPage}) => {

  return (
    <div className={styles.container}>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={setPage}
      />
    </div>
  )
}

export default Paging;