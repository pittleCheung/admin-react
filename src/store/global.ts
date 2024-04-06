import { StateCreator } from "zustand"

interface UserInfo {
  id?: number
  username?: string
}

export interface siteState {
  logged: boolean
  userInfo: UserInfo
  updateLogged: (logged: boolean) => void
}

export const createSiteSlice: StateCreator<siteState, [], [], siteState> = (
  set
) => ({
  logged: false,
  userInfo: {},
  updateLogged: (logged: any) => set((state) => ({ ...state, logged })),
  updateUserInfo: (userInfo: any) => set((state) => ({ ...state, ...userInfo }))
})
