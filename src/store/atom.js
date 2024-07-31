import { atom } from 'recoil'

export const counterAtom = atom({
    key: 'counterAtom',
    default: 0
})

export const reviewAtom = atom({
    key: 'reviewAtom',
    default: []
})

// export const isSignIn = atom({
//     key: 'isSignIn',
//     default: false
// })