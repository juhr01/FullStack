import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
      setValue(event.target.value)
  }

  return {
      type,
      value,
      onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
      if (name) {
          axios
              .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}?fullText=true`)
              .then((response) => {
                  setCountry(response.data);
              })
              .catch((error) => {
                  setCountry(null);
              });
      }
  }, [name]);

  return country;
}

const Country = ({ country }) => {
  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }


  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flags.png} height='100' alt={`flag of ${country.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App