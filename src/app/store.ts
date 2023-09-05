import { configureStore } from '@reduxjs/toolkit'
import jsonReducer from '../features/fileLoader/GpsJsonSlice'
import counterReducer from '../features/counter/counterSlice'
import gpsLogViewReducer from '../features/mapView/gpsLogViewSlice'

export const store = configureStore({
  reducer: {
    gpsJson: jsonReducer,
    gpsLogView: gpsLogViewReducer,
    counter: counterReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch