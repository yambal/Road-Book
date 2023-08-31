import React from 'react'
import { Route, Routes } from "react-router-dom";
import { DrawerLogview } from '../features/mapView/DrawerLogview';

export const DrawerRouter = () => {


  return (
    <Routes>
      <Route path="/logView" element={<DrawerLogview />} />

    </Routes>
  )
}