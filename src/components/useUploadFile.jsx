import { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Compressor from "compressorjs";

export const useUploadFile = (file) => {
    const [cookies, , ] = useCookies()
    const [icon, setIcon ] = useState('')

    useEffect(() => {
        console.log(icon)
    },[icon])

    new Compressor(file, {
        quality: 0.8,

        success(result) {
            const data = new FormData();
            data.append('icon', result, result.name )
            fetch('https://railway.bookreview.techtrain.dev/uploads', {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${cookies.token}`
            },
            body: data
            })
            .then(res => {
            if (res.ok) return res.json()
            })
            .then(json => {
                console.log(json.iconUrl)
                setIcon(json.iconUrl)
            })
        },
        error(err) {
            console.log(err.message);
        }
    })

    return [icon, setIcon]
}

export default useUploadFile;