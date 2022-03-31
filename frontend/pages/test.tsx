import React, {useState} from 'react';
import Pagination from 'react-js-pagination';
import styles from '../styles/Pagination.module.css';

export interface ReactJsPaginationProps {
  activePage: number;
  itemsCountPerPage?: number | undefined;
  totalItemsCount: number;
  pageRangeDisplayed?: number | undefined;
  prevPageText?: string| React.ReactElement | undefined;
  nextPageText?: string | React.ReactElement | undefined;
}

const Paging = () => {
  const [page, setPage] = useState(1);
  
  const handlePageChange = (page) => {
    setPage(page);
  };
  return (
    <div className={styles.container}>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        onChange={handlePageChange}
      />
    </div>
  )
}

export default Paging;