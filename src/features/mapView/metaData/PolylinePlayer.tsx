import { Slider } from "@mui/material"
import { GpsLogFeature, PolylineCoordunate } from "../../../models/GpsJson"
import React from "react"
import { useMap } from "react-leaflet"
import { latLng } from "leaflet"

export type PolylinePlayerProps = {
  polylineFeature: GpsLogFeature | undefined
}

export const PolylinePlayer = ({
  polylineFeature
}:PolylinePlayerProps) => {
  const [polylineCoordinates, setPolylineCoordinates] = React.useState<PolylineCoordunate[] | undefined>(undefined)
  const [max, setMax] = React.useState<number>(0)
  const [cursor, setCursor] = React.useState<number>(0)
  // const map = useMap()
  
  React.useEffect(() => {
    if (polylineFeature?.polylineCoordinates) {
      setPolylineCoordinates(polylineFeature.polylineCoordinates)
      setMax(polylineFeature.polylineCoordinates.length - 1)
    } else {
      setPolylineCoordinates(undefined)
      setMax(0)
    }
    setCursor(0)
  }, [polylineFeature?.polylineCoordinates])

  const sliderHandler = React.useCallback((event: Event, newCursor: number | number[]) => {
    if (typeof newCursor === "number") {
      setCursor(newCursor)
    }
  }, [])

  React.useEffect(() => {
    if (polylineCoordinates) {
      const polylineCoordinate = polylineCoordinates[cursor]
      const to = latLng(polylineCoordinate.coordinate.lat, polylineCoordinate.coordinate.lng)
      console.log(to)
    }
  }, [polylineCoordinates, cursor])

  return (
    <>
      <Slider defaultValue={0} step={1} max={max} onChange={sliderHandler} aria-label="Disabled slider" />
      {cursor}
    </>
  )
}