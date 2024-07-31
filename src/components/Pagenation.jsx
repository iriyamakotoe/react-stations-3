import React, { useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { counterAtom } from "../store/atom";
import "./pagenation.scss";

export const Pagenation = () => {
  const prevBtnRef = useRef(null)
  const [counter, setCounter] = useRecoilState(counterAtom)

  useEffect(() => {
    if(counter == 0) {
        prevBtnRef.current.disabled = true;
    }
  }, [])

  const handlePrevPage = () => {
    if(counter >= 1) {
      setCounter((c) => c - 1)
      if(counter == 1) {
        prevBtnRef.current.disabled = true;
      }
    }
  }
  const handleNextPage = () => {
    setCounter((c) => c + 1)
    prevBtnRef.current.disabled = false;
  }
  return (
    <>
    <div className="flex justify-between">
      <button type='button' onClick={handlePrevPage} ref={prevBtnRef}>前へ</button>
      <button type='button' onClick={handleNextPage}>次へ</button>
    </div>
    </>
  );
};

export default Pagenation;