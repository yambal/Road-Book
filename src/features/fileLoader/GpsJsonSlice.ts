import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { GpsFeature, GpsLog } from '../../models/GpsJson'

// Define a type for the slice state
export interface GpsJsonState {
  features: GpsFeature[]
}

// Define the initial state using that type
const initialState: GpsJsonState = {
  features: []
}

export const gpsJsonSlice = createSlice({
  name: 'gpsJson',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<GpsLog>) => {
      console.log('set', action)
      state.features = action.payload.features
    },
  }
})

export const { set } = gpsJsonSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default gpsJsonSlice.reducer