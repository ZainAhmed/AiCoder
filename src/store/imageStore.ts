import { create } from "zustand";

interface ImageStore {
  imageUrl: string[];
  setImageUrl: (url: string[]) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  imageUrl: [],
  setImageUrl: (url) => set({ imageUrl: url }),
}));
