import { LatLngExpression, Icon } from "leaflet"
import { Marker } from "react-leaflet"

export type PointMakerProps = {
  latLang: LatLngExpression
  opacity?: number
}

export const PointMaker = ({
  latLang,
  opacity = 1
}: PointMakerProps) => {

  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  });

  return (
    <Marker position={latLang} opacity={opacity}/>
  )
}