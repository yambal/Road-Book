import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { GpsLogLatLng } from '../../models/GpsJson'

export interface GpsLogViewState {
  currentFeatureId: string | undefined,
  center: GpsLogLatLng | undefined
}

const initialState: GpsLogViewState = {
  currentFeatureId: undefined,
  center:undefined
}

export const gpsLogViewSlice = createSlice({
  name: 'gpsLogView',
  initialState,
  reducers: {
    setCurrentFeatureId: (state, action: PayloadAction<string | undefined>) => {
      state.currentFeatureId = action.payload
    },
    setCenter: (state, action: PayloadAction<GpsLogLatLng | undefined>) => {
      state.center = action.payload
    }
  }
})

export const { setCurrentFeatureId, setCenter } = gpsLogViewSlice.actions

export const selectGpsLogView = (state: RootState) => state.gpsLogView

export default gpsLogViewSlice.reducer