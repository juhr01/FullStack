import { useState, useEffect } from 'react'
import axios from 'axios'

import { Weather, Visibility } from './types'

interface Diary {
  id: number,
  date: string,
  weather: Weather,
  visibility: Visibility,
  comment: string
}

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([])

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data as Diary[])
      console.log(diaries)
    })
  }, [])

  return (
    <>
      <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => 
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
      </div>
    </>
  )
}

export default App
