import React from 'react'
import { gpxToGeoJson } from './gpxToGeoJson';

export const FileLoader = () => {
  const [data, setData] = React.useState({})

  const fileChangeHandle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files && files?.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const readedText = reader.result
        const geoJson = gpxToGeoJson(String(readedText))
        setData(geoJson)
      }
      reader.readAsText(file)
    }
  }, [])

  return (
    <div>
      <input type="file" onChange={fileChangeHandle}/>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}