import Compressor from "compressorjs";

export const UploadFile = (file, token) => {
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