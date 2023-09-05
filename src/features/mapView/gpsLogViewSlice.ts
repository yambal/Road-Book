import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
export interface GpsLogViewState {
  currentFeatureId: string | undefined
}

const initialState: GpsLogViewState = {
  currentFeatureId: undefined
}

export const gpsLogViewSlice = createSlice({
  name: 'gpsLogView',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<string | undefined>) => {
      console.log('set', action)
      state.currentFeatureId = action.payload
    }
  }
})

export const { set } = gpsLogViewSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGpsLogView = (state: RootState) => state.gpsLogView

export default gpsLogViewSlice.reducer