import { ReactElement } from "react"

import { FeatureFlags } from "@/shared/types/featureFlags"

import { getFeatureFlag } from "./setGetFeatures"

interface ToggleFeaturesOptions {
  feature: keyof FeatureFlags
  on: ReactElement
  off: ReactElement
}

export const ToggleFeaturesComponent = ({ off, on, feature }: ToggleFeaturesOptions) => {
  if (getFeatureFlag(feature)) {
    return on
  }
  return off
}
