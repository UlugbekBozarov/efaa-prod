export type { IShortcut } from "./config.type";

export { initialType, initialMode, initialShortcuts } from "./config.store";
export {
  configurationInitialized,
  typeSet,
  changeMode,
  shortcutsSet,
} from "./config.store";

export { configSync } from "./config.sync";
