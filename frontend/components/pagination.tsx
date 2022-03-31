import { StylesContext } from '@material-ui/styles';
import React, {useState} from 'react';
import Pagination from 'react-js-pagination';

// page : 현재 페이지, count : 총 아이템의 개수, items : 가져올 아이템, 배열 형태 
const Paging = ({ page, count, setPage}) => {
 

  return (
    <Pagination 
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={450}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={setPage}
    />
  )
}