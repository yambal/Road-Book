import React from 'react'

export const FileLoader = () => {
  const [data, setData] = React.useState({})

  const fileChangeHandle = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files
    if (files && files?.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = () => {
        const readedText = reader.result
      }
      reader.readAsText(file)
    }
  }, [])

  return (
    <div>
      <input type="file" onChange={fileChangeHandle}/>
      <pre>{JSON.stringify(data)}</pre>
    </div>
  )
}