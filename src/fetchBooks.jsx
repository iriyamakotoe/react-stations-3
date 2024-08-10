import React, { useState, useRef } from 'react'
import { useCookies } from 'react-cookie'

export const fetchBooks = (
    url,
    opts = defaultOpts,
    readBody = defaultReadBody,
  ) => {
        fetch('https://railway.bookreview.techtrain.dev/books/'+ urlParameters.id, {
            headers: {
            'Authorization': `Bearer ${cookie}`
            }
        })
        .then(res => res.json())
        .then(json => {
            const output = `<p>${json.detail}</p>`;
          console.log(output)
        })

}