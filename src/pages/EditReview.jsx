import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Header } from "../components/Header";
import { InputItem } from "../components/InputItem";
import { TextAreaItem } from "../components/TextAreaItem";
import { DleteReviewButton } from "../components/DleteReviewButton";
import { useFetchBook } from "../components/useFetchBook";

export const EditReview = () => {
  const [cookies, ,] = useCookies();
  const urlParameters = useParams();
  const [bookData, setBookData, isLoading] = useFetchBook(urlParameters);

  const defaultValues = {
    title: bookData.title,
    url: bookData.url,
    detail: bookData.detail,
    review: bookData.review,
  };
  const values = { ...defaultValues };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all", defaultValues, values });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  const onSubmit = (data) => {
    console.log(data, urlParameters.id, cookies.token);
    setErrorMessage("");
    fetch(
      "https://railway.bookreview.techtrain.dev/books/" + urlParameters.id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(data),
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          setErrorMessage(`エラーが発生しました：${res.status}`);
        }
      })
      .then((json) => {
        console.log(json);
        setBookData(json);
        setSuccessMessage(true);
        setTimeout(() => {
          setSuccessMessage(false);
        }, "3000");
      })
      .catch(() => {
        console.log("error");
      });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main>
          <p className="text-center">Loading...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <h2 className="page-title">書籍レビュー編集</h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate="novalidate">
          <InputItem
            register={register}
            type="text"
            id="title"
            label="書籍タイトル"
            pattern={{}}
            errors={errors.title}
            defaultValues={defaultValues.title}
          />

          <InputItem
            register={register}
            type="text"
            id="url"
            label="URL"
            pattern={{
              value: /[\w!?/+\-_~=;.,*&@#$%()'[\]]+$/i,
              message: "URLの形式が不正です",
            }}
            errors={errors.url}
            defaultValues={defaultValues.url}
          />

          <TextAreaItem
            register={register}
            type="text"
            id="detail"
            label="概要"
            pattern={{}}
            errors={errors.detail}
            defaultValues={defaultValues.detail}
          />

          <TextAreaItem
            register={register}
            type="text"
            id="review"
            label="レビュー"
            pattern={{}}
            errors={errors.review}
            defaultValues={defaultValues.review}
          />

          <p className="flex justify-center mt-10">
            <button type="submit">更新</button>
            <DleteReviewButton bookData={bookData} />
          </p>
          <p className="error form-error mt-5 text-center">{errorMessage}</p>
        </form>

        {successMessage && (
          <p className="success bg-orange-50 text-orange-600 mb-10 p-3">
            更新しました！
          </p>
        )}
      </main>
    </>
  );
};

export default EditReview;
