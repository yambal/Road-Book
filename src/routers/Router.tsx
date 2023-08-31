import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { MapView } from "../features/mapView/MapView";
import { Counter } from "../features/counter/Counter";
import { FileLoader } from "../features/fileLoader/FileLoader";

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<FileLoader />} />
      <Route path="/logView" element={<MapView centerPotision={[35, 135]}/>} />
      <Route path="/counter" element={<Counter />} />
    </Routes>
  )
}