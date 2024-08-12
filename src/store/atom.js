import { atom } from "recoil";

export const counterAtom = atom({
  key: "counterAtom",
  default: null,
});

export const reviewAtom = atom({
  key: "reviewAtom",
  default: [],
});

export const isLoadingAtom = atom({
  key: "isLoadingAtom",
  default: null,
});

export const profileAtom = atom({
  key: "profileAtom",
  default: {},
});
