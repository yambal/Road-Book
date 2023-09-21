import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { GpsLogFeature, GpsLog } from '../../models/GpsJson'

// Define a type for the slice state
export interface GpsLogState {
  features: GpsLogFeature[]
}

// Define the initial state using that type
const initialState: GpsLogState = {
  features: []
}

export const gpsLogSlice = createSlice({
  name: 'gpsLog',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    set: (state, action: PayloadAction<GpsLog>) => {
      console.log('set', action)
      state.features = action.payload.features
    },
    cut: (state, action: PayloadAction<{featureId: String, cutPoint: number}>) => {
      state.features.forEach(feature => {
        if (feature.id === action.payload.featureId) {
          feature.polylineCoordinates = feature.polylineCoordinates?.slice(0,action.payload.cutPoint)

          const newFeature: GpsLogFeature = feature
          // newFeature.polylineCoordinates = newFeature.polylineCoordinates?.slice(action.payload.cutPoint)
          console.log(newFeature)
        }
      })


    }
  }
})

export const { set, cut } = gpsLogSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default gpsLogSlice.reducer