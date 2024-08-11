import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useFetchBook = (urlParameters) => {
  const [cookies, , ] = useCookies()
  const [bookData, setBookData] = useState({})
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBooks()
    setIsLoading(true)
  },[])

  // ローディング確認のため処理を遅延させるためのダミーの休止処理
  const sleep = delay => new Promise(resolve => setTimeout(resolve,delay))

  const fetchBooks = async () => {
    await sleep(500)
    await fetch('https://railway.bookreview.techtrain.dev/books/'+ urlParameters.id, {
      headers: {
        'Authorization': `Bearer ${cookies.token}`
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json)
      setBookData(json)
    })
    .catch(() => {
      console.log('error')
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }

  return [bookData, setBookData, isLoading]
}

export default useFetchBook;