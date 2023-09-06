import { configureStore } from '@reduxjs/toolkit'
import gpsLogReducer from '../features/fileLoader/gpsLogSlice'
import counterReducer from '../features/counter/counterSlice'
import gpsLogViewReducer from '../features/mapView/gpsLogViewSlice'

export const store = configureStore({
  reducer: {
    gpsLog: gpsLogReducer,
    gpsLogView: gpsLogViewReducer,
    counter: counterReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch