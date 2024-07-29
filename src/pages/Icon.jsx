import React, { useState } from 'react'
import { useRef } from 'react';

export const Icon = () => {
const inputRef = useRef(null);
const [errorMessage, setErrorMessage] = useState('')


  const onSubmit = () => {
    setErrorMessage('')

    const file = inputRef.current.files.item(0)
    console.log(file)

    const fd = new FormData();
    fd.append('icon', file);
    console.log(fd.get('icon'))
  

    // 画像をアップロードする
    fetch('https://railway.bookreview.techtrain.dev/uploads', {
        method: 'POST',
        // headers:{'Authorization': ''},
        body: fd.get('icon')
      })
      .then((res) => {
        console.log(res)
        if(!res.ok) {
          setErrorMessage(`画像登録に失敗しました。${res.status}`)
        }
      })
  }


  return (
    <>
      <h2>ユーザー新規登録画面</h2>
      <form noValidate="novalidate" encType="multipart/form-data">
        <p><label htmlFor="icon">ユーザーアイコン：</label><input type="file" name="input_file" ref={inputRef} /><br /><br />
        <span>jpg, pngファイルサイズは1MB以下</span><br />
        </p>
        <input type="button" value="登録" onClick={onSubmit} />
        <p className="error">{errorMessage}</p>
      </form>
    </>
  );
};

export default Icon;
