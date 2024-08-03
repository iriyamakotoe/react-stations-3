import { atom } from 'recoil'

export const counterAtom = atom({
    key: 'counterAtom',
    default: 0
})

export const reviewAtom = atom({
    key: 'reviewAtom',
    default: []
})

export const iconAtom = atom({
    key: 'iconAtom',
    default: null
})

export const profileAtom = atom({
    key: 'profileAtom',
    default: {}
})