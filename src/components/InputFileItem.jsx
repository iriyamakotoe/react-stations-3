import React, { useEffect,useRef } from 'react'
import { useCookies } from 'react-cookie'
import { useRecoilState } from 'recoil'
import { iconAtom } from "../store/atom";
import Compressor from "compressorjs";

export const InputFileItem = (props) => {
  const [cookies, setCookie, ] = useCookies()
  const inputFileRef = useRef(null);
  const [iconToken, setIconToken ] = useRecoilState(iconAtom)
  useEffect(() => {
    const file = inputFileRef.current.files[0]
    console.log(cookies.token)
    new Compressor(file, {
      quality: 0.8,
  
      success(result) {
        const data = new FormData();
        data.append('icon', result, result.name )
        fetch('https://railway.bookreview.techtrain.dev/uploads', {
          method: 'POST',
          headers:{
            'Authorization': `Bearer ${iconToken}`
          },
          body: data
        })
        .then(res => {
          if (res.ok) return res.json()
            else
          props.setErrorMessage(`画像登録エラーが発生しました：${res.status}`)
        })
        .then(json => {
          setCookie('iconUrl', json.iconUrl)
          console.log('画像登録成功')
        })
      },
      error(err) {
        console.log(err.message);
      },
    })
  }, [iconToken])

  return (
    <>
        <p className='mt-10'><label htmlFor="iconUrl">ユーザーアイコン：</label>
        <input type="file" accept="image/png, image/jpg" ref={inputFileRef} /><br />
        <span className='text-gray text-s mt-3 inline-block'>※登録できる画像：拡張子 - jpg・png、サイズ - 1MB以内</span></p>
    </>
  );
};

export default InputFileItem;