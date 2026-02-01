import { create } from 'zustand';

interface AppState {
    isReady: boolean;
    setReady: (ready: boolean) => void;
    musicRequested: boolean;
    setMusicRequested: (requested: boolean) => void;
    musicStarted: boolean; // Actual playback status from audio element
    setMusicStarted: (started: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
    isReady: false,
    setReady: (ready: boolean) => set({ isReady: ready }),
    musicRequested: false,
    setMusicRequested: (requested: boolean) => set({ musicRequested: requested }),
    musicStarted: false,
    setMusicStarted: (started: boolean) => set({ musicStarted: started }),
}));
