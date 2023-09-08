import { LatLngExpression, Icon } from "leaflet"
import React from "react"
import { Marker } from "react-leaflet"
import { useAppDispatch } from "../../../../app/hooks"
import { setCurrentFeatureId } from "../../gpsLogViewSlice"

export type PointMakerProps = {
  id: string
  latLang: LatLngExpression
  opacity?: number
}

export const PointMaker = ({
  id,
  latLang,
  opacity = 1
}: PointMakerProps) => {
  const dispatch = useAppDispatch()

  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  const clickHandler = React.useCallback(() => {
    dispatch(setCurrentFeatureId(id))
  }, [id,dispatch])

  return (
    <Marker position={latLang} opacity={opacity} eventHandlers={{
      click: clickHandler
    }}/>
  )
}