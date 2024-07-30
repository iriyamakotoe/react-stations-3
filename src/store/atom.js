import { atom } from 'recoil'

export const counterAtom = atom({
    key: 'counterAtom',
    default: 0
})

export const disableAtom = atom({
    key: 'disableAtom',
    default: 'disabled'
})