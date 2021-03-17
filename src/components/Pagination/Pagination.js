import React from 'react'
import classes from './Pagination.module.css';

const Pagination = (props) => {
    
  // const array = []
  // for(var i = 1; i <= props.totalPages; i++){
  //   array.push(<button key={i} onClick={handlePageClick({i})}>{i}</button>)
  // }

  let totalPages = props.courseState.total;
  console.log({totalPages})

  function handlePageClick(index){
    props.onPageClick(index);
  }

  
  let prevPage = null;
  let prevPageValue = props.page-1;
  if(1<=prevPageValue){
    console.log({prevPageValue});
    prevPage = (
      <button key={prevPageValue} className={classes.number} onClick={handlePageClick.bind(handlePageClick,prevPageValue)}>{prevPageValue}</button>
      // onClick={handlePageClick(prevPageValue)}
    )
  }

  let nextPage = null;
  let nextPageValue = props.page+1;
  if(nextPageValue<=totalPages){
    console.log({nextPageValue});
    nextPage = (
      <button key={nextPageValue} className={classes.number} onClick={handlePageClick.bind(handlePageClick,nextPageValue)}>{nextPageValue}</button>
    )
  }
  
  let backText = "<"
  let nextText = ">"
  return (
    <div className={classes.mainClass}>
      <button id="prev" className={classes.number} type="button" disabled={props.page<=1} onClick={props.onLeftClick}> {backText} </button>
      {/* {array} */}
      {prevPage}
      <button id={props.page} className={classes.activeNumber} type="button" >{props.page}</button>
      {nextPage}
      <button id="next" className={classes.number}  type="button" disabled={props.page>=totalPages} onClick={props.onRightClick} >{nextText}</button>

    </div>
  )
}

export default Pagination;