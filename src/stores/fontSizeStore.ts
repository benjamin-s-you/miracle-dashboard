import { create } from 'zustand';

type FontSize = 'small' | 'medium' | 'large';

interface FontSizeState {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  toggleFontSize: () => void;
}

/**
 * Zustand store for managing font size preferences.
 */
export const useFontSizeStore = create<FontSizeState>((set, get) => ({
  fontSize: 'medium',
  setFontSize: size => set({ fontSize: size }),
  toggleFontSize: () => {
    const sizes: FontSize[] = ['small', 'medium', 'large'];
    const currentIndex = sizes.indexOf(get().fontSize);
    const nextIndex = (currentIndex + 1) % sizes.length;
    set({ fontSize: sizes[nextIndex] });
  },
}));
