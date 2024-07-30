import React, { useState, useEffect } from 'react'
import "./reviewlist.scss";

export const ReviewList = (props) => {
  return (
    <>
      <ul className="review-list">
      {props.review.map((obj) => <li key={obj.id} className=''>{obj.title}</li>)}
      </ul>
    </>
  );
};

export default ReviewList;