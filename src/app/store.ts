import { configureStore } from '@reduxjs/toolkit'
import jsonReducer from '../features/fileLoader/GpsJsonSlice'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    gpsJson: jsonReducer,
    counter: counterReducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch