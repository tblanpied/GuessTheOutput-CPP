import { now, safeParse } from "../utils";
import { TRAINING_CONFIG_VERSION, TrainingStore } from "./model";

const STORAGE_KEY = "gtocpp.training.store.v1";
const STORE_EVENT = "gtocpp.training.store.changed";

function isBrowser() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function defaultStore(): TrainingStore {
  return {
    version: 1,
    activeSessionId: null,
    sessionsById: {},
  };
}

export function loadStore(): TrainingStore {
  if (!isBrowser()) return defaultStore();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultStore();

  const parsed = safeParse(raw) as TrainingStore | null;
  if (
    !parsed ||
    parsed.version !== TRAINING_CONFIG_VERSION ||
    typeof parsed.sessionsById !== "object"
  ) {
    return defaultStore();
  }

  return parsed;
}

export function saveStore(store: TrainingStore): void {
  if (!isBrowser()) return;

  // localStorage only stores strings, so we serialize to JSON.
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  // Same-tab notification (storage event does not fire in the same document).
  window.dispatchEvent(new Event(STORE_EVENT));
}

/**
 * Subscribe to any change of the training store.
 * - Same tab: the custom event
 * - Other tabs: the native `storage` event
 */
export function subscribeStore(listener: () => void): () => void {
  if (!isBrowser()) return () => {};

  const onCustom = () => listener();
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) listener();
  };

  window.addEventListener(STORE_EVENT, onCustom);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(STORE_EVENT, onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

export function updateStore(updater: (prev: TrainingStore) => TrainingStore): TrainingStore {
  const prev = loadStore();
  const next = updater(prev);
  if (next !== prev) {
    saveStore(next);
  }
  return next;
}

export function newId(prefix = "ts"): string {
  // Small, readable id. Good enough for local usage.
  // eslint-disable-next-line sonarjs/pseudo-random
  return `${prefix}_${now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
