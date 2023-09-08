import React from 'react'
import { useAppDispatch } from '../../app/hooks'
import { set as setGpsLog } from './gpsLogSlice'
import { setCurrentFeatureId } from '../mapView/gpsLogViewSlice'
import { useNavigate } from 'react-router'
import { geoJsonStringToGpsLog } from './utils/geoJsonStringToGpsLog'

export const FileLoader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  
  const fileChangeHandle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files && files?.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const gpsLog = geoJsonStringToGpsLog(String(reader.result))
        dispatch(setGpsLog(gpsLog))
        dispatch(setCurrentFeatureId(gpsLog.features[0].id))
        navigate('logView')
      }
      reader.readAsText(file)
    }
  }, [])

  return (
    <div>
      <input type="file" onChange={fileChangeHandle}/>
    </div>
  )
}