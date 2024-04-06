import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getInfo } from "src/services/login"
import { storage } from "src/utils/auth"

export const $getCurrentInfo = createAsyncThunk(
  "global/getCurrentInfo",
  getInfo
)

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    logged: false,
    userInfo: {}
  },
  reducers: {
    setUserInfo(state, { payload }) {
      state.userInfo = payload
      state.logged = true
    }
  },
  extraReducers: (builder) => {
    builder.addCase($getCurrentInfo.fulfilled, (state, { payload }) => {
      // console.log(payload,'fulfilled')
      if (payload) {
        state.userInfo = payload
        state.logged = true
      } else {
        storage.clear(true)
        window.location.hash = "/login"
      }
      // console.log(payload,'payload--fulfilled')
      //  if(payload.data){
      //    state.userInfo = payload.data;
      //    state.logged = true;
      //  }else{
      //    storage.clear(true);
      //    window.location.hash = "/login"
      //  }
    })
    // 如果jwt过期  就不会走到fulfilled
    builder.addCase($getCurrentInfo.pending, (state, { payload }) => {
      // console.log(payload,'payload--fulfilled',state.logged)
      // if(!payload){
      //   window.location.hash = "/login"
      // }
      //  if(!state.logged){
      //   window.location.hash = "/login"
      //  }
    })
  }
})

// 对应的action
// export const { setUserInfo } = globalSlice.actions;

// 导出的是正常的reducer函数
// export globalSlice.reducer;

export const {
  reducer,
  actions: { setUserInfo }
} = globalSlice
