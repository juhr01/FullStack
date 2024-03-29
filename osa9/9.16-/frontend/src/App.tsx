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
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great)
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    axios.get<Diary[]>('http://localhost:3001/api/diaries').then(response => {
      setDiaries(response.data as Diary[])
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary = {
      id: diaries.length + 1,
      date,
      weather: weather as Weather,
      visibility: visibility as Visibility,
      comment
    }

    try {
      const response =  await axios.post<Diary>('http://localhost:3001/api/diaries', newDiary)
        setDiaries([...diaries, response.data])
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios error, handle accordingly
        setErrorMessage(error.response?.data);
      } else {
        // Non-Axios error, handle accordingly
        setErrorMessage('An error occurred');
      }
  
      setTimeout(() => {
        setErrorMessage('');
      }, 4000);
    }
    
    setDate('')
    setVisibility(Visibility.Great)
    setWeather(Weather.Sunny)
    setComment('')
  }

  const errorStyle = {
    color: "red"
  }

  return (
    <>
      <div>
        {errorMessage && <p style={errorStyle}>{errorMessage}</p>}
        <form onSubmit={addDiary}>
          <h2>Add new diary</h2>
          <input id="date" type="date" value={date} onChange={({ target }) => setDate(target.value)}></input>
          <br></br>
          <br></br>
          <label htmlFor="visibility" >visibility</label>
          <select id="visibility" value="visibility" onChange={({ target }) => setVisibility(target.value as Visibility)}>
            <option value="great">{Visibility.Great}</option>
            <option value="good">{Visibility.Good}</option>
            <option value="ok">{Visibility.Ok}</option>
            <option value="poor">{Visibility.Poor}</option>
          </select>
          <br></br>
          <br></br>
          <label htmlFor="weather">weather</label>
          <select id="weather" value="weather" onChange={({ target }) => setWeather(target.value as Weather)}>
            <option value="sunny">{Weather.Sunny}</option>
            <option value="rainy">{Weather.Rainy}</option>
            <option value="cloudy">{Weather.Cloudy}</option>
            <option value="stormy">{Weather.Stormy}</option>
            <option value="windy">{Weather.Windy}</option>
          </select>
          <br></br>
          <br></br>
          <label htmlFor="comment">comment</label>
          <input id="comment" value={comment} onChange={({ target }) => setComment(target.value)}></input>
          <br></br>
          <br></br>
          <button type="submit">add</button>

        </form>

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
