import { create } from "zustand"
import { createSiteSlice, siteState } from "./global"

export const useAppStore = create<siteState>((...a) => ({
  ...createSiteSlice(...a)
}))
