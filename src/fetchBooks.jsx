import React, { useState, useRef } from 'react'
import { useCookies } from 'react-cookie'

export const fetchBooks = (urlParameters,cookie) => {
    const data = fetch('https://railway.bookreview.techtrain.dev/books/'+ urlParameters.id, {
        headers: {
        'Authorization': `Bearer ${cookie}`
        }
    })
    .then(res => res.json())
    .then(json => {
        console.log(json)
    })
    return data
}