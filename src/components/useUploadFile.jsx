import Compressor from "compressorjs";
import { useRecoilState } from 'recoil'
import { profileAtom } from "../store/atom"

export default const useUploadFile = (file, token) => {
    const [profile, setProfile ] = useRecoilState(profileAtom)
    new Compressor(file, {
        quality: 0.8,

        success(result) {
            const data = new FormData();
            data.append('icon', result, result.name )
            fetch('https://railway.bookreview.techtrain.dev/uploads', {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${token}`
            },
            body: data
            })
            .then(res => {
            if (res.ok) return res.json()
                else
            props.setErrorMessage(`画像登録エラーが発生しました：${res.status}`)
            })
            .then(json => {
                return json.iconUrl
            })
        },
        error(err) {
            console.log(err.message);
        }
    })
}