import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { LibraryEntry } from "./types";
import {
  DEFAULT_VOICE,
  getLibraryByPrompt,
  getRandomLibrarySet,
} from "./library";

export interface AppState {
  voice: string;
  input: string;
  inputDirty: boolean;
  prompt: string;
  codeView: string;
  selectedEntry: LibraryEntry | null;
  librarySet: LibraryEntry[];
  latestAudioUrl: string | null;
}

const INITIAL_STATE: AppState = {
  voice: DEFAULT_VOICE,
  input: "",
  inputDirty: false,
  prompt: "",
  codeView: "py",
  selectedEntry: null,
  librarySet: [],
  latestAudioUrl: null,
};

class AppStore {
  private store = create(immer(() => INITIAL_STATE));

  constructor() {
    this.store.setState((draft) => {
      const randomSet = getRandomLibrarySet();
      draft.librarySet = randomSet;
      draft.selectedEntry = randomSet[0];
      draft.input = randomSet[0].input;
      draft.prompt = randomSet[0].prompt;
    });

    if (typeof window === "undefined") {
      return;
    }

    const hash = window.location.hash.slice(1);
    if (!hash) {
      return;
    }

    fetch(`/api/share?hash=${hash}`)
      .then((response) => {
        if (!response.ok) {
          return null;
        }
        return response.json();
      })
      .then((sharedParams) => {
        if (sharedParams) {
          this.store.setState((draft) => {
            draft.input = sharedParams.input;
            draft.prompt = sharedParams.prompt;
            draft.voice = sharedParams.voice;

            const maybeSpecificVibe = getLibraryByPrompt(sharedParams.prompt);
            if (maybeSpecificVibe) {
              const exists = draft.librarySet.find(
                (lib) => lib.prompt === maybeSpecificVibe.prompt
              );
              if (!exists) {
                draft.librarySet[0] = maybeSpecificVibe;
                draft.selectedEntry = maybeSpecificVibe;
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error("Error loading shared params:", error);
      });
  }

  useState = this.store;
  setState = this.store.setState;
  getState = this.store.getState;
  subscribe = this.store.subscribe;
}

export const appStore = new AppStore() as Readonly<AppStore>;
