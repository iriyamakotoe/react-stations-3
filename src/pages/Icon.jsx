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
    <main>
      <h2 className='page-title'>ユーザーアイコン登録画面</h2>
      <form noValidate="novalidate" encType="multipart/form-data">
        <p className='mb-3'><label htmlFor="icon">アイコン：</label><input type="file" name="input_file" ref={inputRef} /></p>
        <p><span className='inline-block text-gray mb-10'>※jpg, png、ファイルサイズは1MB以下</span><br />
        </p>
        <p className='flex justify-center'><button type="button" value="" onClick={onSubmit}>登録</button></p>
        <p className="error mt-5 text-center">{errorMessage}</p>
      </form>
      </main>
    </>
  );
};

export default Icon;
