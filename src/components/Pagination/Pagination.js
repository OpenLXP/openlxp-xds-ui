import React from 'react'
import classes from './Pagination.module.css';
import { Link } from 'react-router-dom'


const Pagination = (props) => {

  let totalEntries = props.courseState.total;
  let totalPages = Math.ceil(totalEntries/10);
  console.log({totalPages})

  let prevPage = null;
  let prevPageValue = props.page-1;
  if(1<=prevPageValue){
    console.log({prevPageValue});
    prevPage = (
      <Link
        to={{
          pathname: "/search/",
          search: "?kw=" + props.searchInputState + "&p=" + (prevPageValue)
        }}
        className="btn">
          <button key={prevPageValue} className={classes.number} >{prevPageValue}</button>
      </Link>
      )
  }

  let nextPage = null;
  let nextPageValue = parseInt(props.page)+1;
  if(nextPageValue<=totalPages){
    console.log({nextPageValue});
    nextPage = (
      <Link
        to={{
          pathname: "/search/",
          search: "?kw=" + props.searchInputState + "&p=" + (nextPageValue)
        }}
        className="btn">
          <button key={nextPageValue} className={classes.number} >{nextPageValue}</button>
      </Link>
    )
  }
  
  let backText = "<"
  let nextText = ">"
  return (
    <div className={classes.mainClass}>
      <Link
        to={{
          pathname: "/search/",
          search: "?kw=" + props.searchInputState + "&p=" + (prevPageValue)
        }}
        className="btn">
          <button id="prev" className={classes.number} type="button" disabled={props.page<=1}> {backText} </button>
      </Link>
      {prevPage}
      <button id={props.page} className={classes.activeNumber} type="button" >{props.page}</button>
      {nextPage}
      <Link
        to={{
          pathname: "/search/",
          search: "?kw=" + props.searchInputState + "&p=" + (nextPageValue)
        }}
        className="btn">
          <button id="next" className={classes.number}  type="button" disabled={props.page>=totalPages}>{nextText}</button>
      </Link>
    </div>
  )
}

export default Pagination;