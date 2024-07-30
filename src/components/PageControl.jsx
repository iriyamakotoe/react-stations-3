import React, { useState, useEffect, useRef } from 'react'
import "./reviewlist.scss";

export const PageControl = (props) => {
  const prevButton = useRef(null)
  const nextButton = useRef(null)
  return (
    <>
    <div className="flex justify-between">
      <button type='button' onClick={() => props.handlePagePrev(prevButton.current)}>前へ</button>
      <button type='button' onClick={() => props.handlePageNext(nextButton.current)}>次へ</button>
    </div>
    </>
  );
};

export default PageControl;