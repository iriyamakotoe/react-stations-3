import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useRecoilState } from "recoil";
import { reviewAtom, counterAtom, isLoadingAtom } from "../store/atom";
import "./reviewlist.scss";

export const ReviewList = () => {
  const [cookies, ,] = useCookies();
  const [review, setReview] = useRecoilState(reviewAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingAtom);
  const [counter] = useRecoilState(counterAtom);

  useEffect(() => {
    counter == null && setIsLoading(true);
    fetchReview();
  }, [counter]);

  const fetchReview = async () => {
    console.log(counter);
    let request;
    if (cookies.token) {
      request = new Request(
        "https://railway.bookreview.techtrain.dev/books?offset=" + counter * 10,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        },
      );
    } else {
      request = new Request(
        "https://railway.bookreview.techtrain.dev/public/books?offset=" +
          counter * 10,
        {},
      );
    }
    await fetch(request)
      .then((res) => res.json())
      .then((json) => {
        setReview(json);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClick = (selectBookId) => {
    fetch("https://railway.bookreview.techtrain.dev/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.token}`,
      },
      body: JSON.stringify({ selectBookId: selectBookId }),
    }).then((res) => {
      console.log(res);
      if (res.ok) return console.log(`ログ送信成功`);
      else console.log(`ログ送信失敗：${res.status}`);
    });
  };

  if (isLoading) {
    return (
      <>
        <p className="text-center">Loading...</p>
      </>
    );
  }

  return (
    <>
      {cookies.token ? (
        <ul className="review-list">
          {review.map((obj) => (
            <li key={obj.id} className="">
              <Link
                to={"/detail/" + obj.id}
                onClick={() => handleClick(obj.id)}
              >
                {obj.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="review-list">
          {review.map((obj) => (
            <li key={obj.id} className="">
              {obj.title}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReviewList;
