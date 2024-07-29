import React, { useState, useEffect } from 'react'
import "./reviewlist.scss";

export const PageControl = (props) => {
  return (
    <>
      <button type='button' onClick={() => props.handlePagePrev()}>前へ</button>
      <button type='button' onClick={() => props.handlePageNext()}>次へ</button>
    </>
  );
};

export default PageControl;