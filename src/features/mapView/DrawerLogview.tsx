import { List, Toolbar } from "@mui/material"
import { useAppSelector } from '../../app/hooks'
import { MapGpsLogListItem } from "./MapGpsLogListItem";

export const DrawerLogview = () => {
  const gpsLogFeatures = useAppSelector(state => state.gpsJson.features)
  return (
    <>
      <Toolbar />
      <List>
      {gpsLogFeatures.map((feature, index) => {
        return (
          <MapGpsLogListItem gpsFeature={feature} key={index}/>
        )
      })}
      </List>
    </>
  )
}