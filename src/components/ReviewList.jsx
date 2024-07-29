import React, { useState, useEffect } from 'react'
import "./reviewlist.scss";

export const ReviewList = (props) => {
  return (
    <>
      <ul>
      {props.review.map((obj) => <li key={obj.id}>{obj.title}</li>)}
      </ul>
    </>
  );
};

export default ReviewList;