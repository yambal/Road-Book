import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

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

export const selectGpsLogView = (state: RootState) => state.gpsLogView

export default gpsLogViewSlice.reducer