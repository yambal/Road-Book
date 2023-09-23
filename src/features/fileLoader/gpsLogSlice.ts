import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { GpsLogFeature, GpsLog } from '../../models/GpsJson'
import { v4 as uuidv4 } from 'uuid';


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
    cutPolyline: (state, action: PayloadAction<{targetFeature: GpsLogFeature, cutPoint: number}>) => {
      const targetFeature = action.payload.targetFeature
      let splice = 0
      state.features.forEach((feature, index) => {
        if (feature.id === targetFeature.id) {
          feature.polylineCoordinates = feature.polylineCoordinates?.slice(0,action.payload.cutPoint + 1)
          splice = index
        }
      })


      const newId = uuidv4()
      const newPolylineCoordinates = targetFeature.polylineCoordinates?.slice(action.payload.cutPoint)
      const newFeature: GpsLogFeature = {
        name: `${targetFeature.name} copy`,
        desc: targetFeature.desc,
        id: newId,
        geometryType: targetFeature.geometryType,
        polylineCoordinates: newPolylineCoordinates,
        coordinate: undefined,
        propertyType:targetFeature.propertyType
      }
      state.features.splice(splice + 1, 0, newFeature)
    }
  }
})

export const { set, cutPolyline } = gpsLogSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default gpsLogSlice.reducer