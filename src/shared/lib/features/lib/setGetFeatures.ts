import { LOCAL_STORAGE_LAST_THEME_KEY } from "@/shared/const/localstorage"
import { FeatureFlags } from "@/shared/types/featureFlags"

// ФИЧИ НЕ МЕНЯЮТСЯ В ХОДЕ СЕССИИ, ИХ НЕОБЯЗАТЕЛЬНО ДЕЛАТЬ РЕАКТИВНЫМИ!
const defaultFeatures: FeatureFlags = {
  isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_LAST_THEME_KEY) === "new",
}
let featureFlags: FeatureFlags = {
  ...defaultFeatures,
}

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
  if (newFeatureFlags) {
    featureFlags = newFeatureFlags
  }
}

export function getFeatureFlag(flag: keyof FeatureFlags) {
  return featureFlags?.[flag]
}

export function getAllFeatureFlags() {
  return featureFlags
}
