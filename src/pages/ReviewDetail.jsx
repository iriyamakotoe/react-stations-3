import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useForm } from "react-hook-form"
import { useRecoilState } from 'recoil'
import { iconAtom } from "../store/atom"
import { useParams } from "react-router-dom";
import { Header } from "../components/Header"
import { InputFileItem } from "../components/InputFileItem"
import "./newreview.scss";

export const ReviewDetail = () => {
  const [cookies, setCookie, ] = useCookies()
  const [icon, setIcon] = useRecoilState(iconAtom)
  const urlParameters = useParams();
    //   const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //   } = useForm({ mode: "all" });


  useEffect(() => {
    fetchPosts()
  },[])

  const fetchPosts = () => {
    fetch('https://railway.bookreview.techtrain.dev/books/'+ urlParameters.id, {
        headers: {
            'Authorization': `Bearer ${cookies.token}`
        }
    })
    //   .then(res => res.json())
    //   .then(json => setPosts(json.posts))
  }

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <>
    <Header />
    <main>
      <h2 className='page-title'>書籍レビュー詳細</h2>
    <p>あああ</p>
      </main>
    </>
  );
};

export default ReviewDetail;
