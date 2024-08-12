import React, { useEffect,useRef } from 'react'
import { useCookies } from 'react-cookie'

export const InputFileItem = () => {
  const [cookies, , ] = useCookies()
  const inputFileRef = useRef(null);
  useEffect(() => {
    UploadFile(inputFileRef.current.files[0],cookies.token)
  }, [])

  return (
    <>
        <p className='mt-10'><label htmlFor="iconUrl">ユーザーアイコン：</label>
        <input type="file" accept="image/png, image/jpg" ref={inputFileRef} /><br />
        <span className='text-gray sqtext-s mt-3 inline-block'>※登録できる画像：拡張子 - jpg・png、サイズ - 1MB以内</span></p>
    </>
  );
};

export default InputFileItem;