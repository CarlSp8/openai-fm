import { LibraryEntry } from "./types";
import libraryData from "./data/library-entries.json";

export const LIBRARY: Record<string, LibraryEntry> = libraryData;

export const getLibraryByPrompt = (
  maybePrompt: string
): LibraryEntry | null => {
  const found = Object.keys(LIBRARY).find(
    (key) => LIBRARY[key].prompt === maybePrompt
  );
  return found ? LIBRARY[found] : null;
};

export function getRandomLibrarySet(count = 5): LibraryEntry[] {
  const availableLibrary = Object.values(LIBRARY);
  return availableLibrary.sort(() => Math.random() - 0.5).slice(0, count);
}

export const DEFAULT_LIBRARY = LIBRARY.Calm;

export const VOICES = [
  "alloy",
  "ash",
  "ballad",
  "coral",
  "echo",
  "fable",
  "onyx",
  "nova",
  "sage",
  "shimmer",
  "verse",
];

export const DEFAULT_VOICE = "coral";

export const getRandomVoice = (currentVoice: string): string => {
  const availableVoices = VOICES.filter((voice) => voice !== currentVoice);
  return availableVoices[Math.floor(Math.random() * availableVoices.length)];
};
